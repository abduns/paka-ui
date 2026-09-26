<?php

use App\Enums\WorkspaceRole;
use App\Models\User;
use App\Services\InstallationState;
use Database\Seeders\InstallSeeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Horizon\Contracts\MasterSupervisorRepository;

function secureBrowserInstallationUrl(): string
{
    return URL::temporarySignedRoute(
        'install.show',
        now()->addHour(),
        absolute: false,
    );
}

function secureSystemInstallationUrl(): string
{
    return URL::temporarySignedRoute(
        'install.system.show',
        now()->addHour(),
        absolute: false,
    );
}

test('the browser installer requires a signed deployment link', function () {
    $this->get(route('install.show'))->assertForbidden();
    $this->get(route('install.system.show'))->assertForbidden();
});

test('the deployment service generates a signed browser installation url', function () {
    $url = app(InstallationState::class)->browserUrl();

    expect($url)->toStartWith(rtrim((string) config('app.url'), '/').'/install?')
        ->toContain('expires=')
        ->toContain('signature=');
});

test('an expired deployment link is rejected', function () {
    $url = URL::temporarySignedRoute(
        'install.show',
        now()->subMinute(),
        absolute: false,
    );

    $this->get($url)->assertForbidden();
});

test('the signed installer reports deployment readiness', function () {
    $this->seed(InstallSeeder::class);
    $url = secureBrowserInstallationUrl();
    parse_str((string) parse_url($url, PHP_URL_QUERY), $signedQuery);

    $response = $this->get($url);

    $response->assertInertia(fn (Assert $page) => $page
        ->component('auth/install')
        ->where('ready', true)
        ->has('checks', 4)
        ->where('systemTestUrl', fn (string $url): bool => str_starts_with($url, '/install/system?'))
        ->where('signedQuery.expires', (string) $signedQuery['expires'])
        ->where('signedQuery.signature', (string) $signedQuery['signature']),
    );
});

test('the signed system page reports sanitized installation checks', function () {
    $this->seed(InstallSeeder::class);

    $response = $this->get(secureSystemInstallationUrl());

    $response->assertInertia(fn (Assert $page) => $page
        ->component('auth/install-system')
        ->has('checks', 6)
        ->where('checks.4.key', 'queue')
        ->where('checks.5.key', 'horizon')
        ->where('installUrl', fn (string $url): bool => str_starts_with($url, '/install?')),
    );
});

test('the system page reports paused Horizon workers as failed', function () {
    $this->seed(InstallSeeder::class);
    config()->set('queue.default', 'redis');
    $masterSupervisors = Mockery::mock(MasterSupervisorRepository::class);
    $masterSupervisors->shouldReceive('all')->once()->andReturn([(object) ['status' => 'paused']]);
    app()->instance(MasterSupervisorRepository::class, $masterSupervisors);
    app()->forgetInstance(InstallationState::class);

    $this->get(secureSystemInstallationUrl())->assertInertia(fn (Assert $page) => $page
        ->component('auth/install-system')
        ->where('checks.5.key', 'horizon')
        ->where('checks.5.status', 'failed'),
    );
});

test('the system checks report a queue configuration that Horizon cannot use', function () {
    $this->seed(InstallSeeder::class);
    config()->set('queue.default', 'database');

    $this->get(secureSystemInstallationUrl())->assertInertia(fn (Assert $page) => $page
        ->component('auth/install-system')
        ->where('checks.4.key', 'queue')
        ->where('checks.4.status', 'failed')
        ->where('checks.5.key', 'horizon')
        ->where('checks.5.status', 'failed'),
    );
});

test('the installer disables account creation when baseline data is missing', function () {
    $response = $this->get(secureBrowserInstallationUrl());

    $response->assertInertia(fn (Assert $page) => $page
        ->component('auth/install')
        ->where('ready', false)
        ->where('checks.2.key', 'baseline')
        ->where('checks.2.ready', false),
    );
});

test('the installer rejects account creation when deployment checks fail', function () {
    $response = $this->post(secureBrowserInstallationUrl(), [
        'name' => 'Ada Lovelace',
        'email' => 'ada@example.com',
        'password' => 'correct-horse-battery-staple',
        'password_confirmation' => 'correct-horse-battery-staple',
    ]);

    $response->assertSessionHasErrors('installation');
    expect(User::query()->count())->toBe(0)
        ->and(DB::table('installations')->count())->toBe(0);
});

test('administrator details are validated before installation', function () {
    $this->seed(InstallSeeder::class);

    $response = $this->post(secureBrowserInstallationUrl(), []);

    $response->assertSessionHasErrors([
        'name',
        'email',
        'password',
        'password_confirmation',
    ]);
    expect(User::query()->count())->toBe(0)
        ->and(DB::table('installations')->count())->toBe(0);
});

test('the browser installer creates and signs in the first administrator', function () {
    $this->seed(InstallSeeder::class);

    $response = $this->post(secureBrowserInstallationUrl(), [
        'name' => 'Ada Lovelace',
        'email' => 'ada@example.com',
        'password' => 'correct-horse-battery-staple',
        'password_confirmation' => 'correct-horse-battery-staple',
    ]);

    $user = User::query()->where('email', 'ada@example.com')->sole();
    $workspace = $user->personalWorkspace();

    $this->assertAuthenticatedAs($user);
    $response->assertRedirect(route('dashboard', ['current_workspace' => $workspace]));
    expect($user->email_verified_at)->not->toBeNull()
        ->and($workspace)->not->toBeNull()
        ->and($workspace->name)->toBe("Ada Lovelace's Workspace")
        ->and($user->workspaceRole($workspace))->toBe(WorkspaceRole::Owner)
        ->and(DB::table('installations')->whereNotNull('completed_at')->exists())->toBeTrue();
});

test('a completed installation cannot be opened or submitted again', function () {
    $this->seed(InstallSeeder::class);
    $url = secureBrowserInstallationUrl();

    $this->post($url, [
        'name' => 'Ada Lovelace',
        'email' => 'ada@example.com',
        'password' => 'correct-horse-battery-staple',
        'password_confirmation' => 'correct-horse-battery-staple',
    ])->assertRedirect();

    $this->get($url)->assertNotFound();
    $this->post($url, [
        'name' => 'Grace Hopper',
        'email' => 'grace@example.com',
        'password' => 'correct-horse-battery-staple',
        'password_confirmation' => 'correct-horse-battery-staple',
    ])->assertNotFound();
    expect(User::query()->count())->toBe(1);
});

test('the database completion marker keeps the installer closed without users', function () {
    $this->seed(InstallSeeder::class);
    $url = secureBrowserInstallationUrl();

    $this->post($url, [
        'name' => 'Ada Lovelace',
        'email' => 'ada@example.com',
        'password' => 'correct-horse-battery-staple',
        'password_confirmation' => 'correct-horse-battery-staple',
    ])->assertRedirect();
    User::query()->delete();

    $this->get($url)->assertNotFound();
});
