<?php

namespace App\Models;

use App\Concerns\HasWorkspaces;
use App\Notifications\ResetPassword;
use App\Services\DiceBearAvatarGenerator;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Laravel\Fortify\Contracts\PasskeyUser;
use Laravel\Fortify\PasskeyAuthenticatable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;

/**
 * @property int $id
 * @property string $uuid
 * @property string $name
 * @property string $email
 * @property string|null $avatar_path
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property Carbon|null $two_factor_confirmed_at
 * @property string|null $remember_token
 * @property int|null $current_workspace_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Workspace|null $currentWorkspace
 * @property-read string $avatar
 * @property-read Collection<int, Workspace> $ownedWorkspaces
 * @property-read Collection<int, Membership> $workspaceMemberships
 * @property-read Collection<int, Workspace> $workspaces
 */
#[Fillable(['name', 'email', 'password', 'current_workspace_id', 'avatar_path'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token', 'avatar_path'])]
class User extends Authenticatable implements PasskeyUser
{
    /**
     * Append the public avatar URL to serialized user data.
     *
     * @var list<string>
     */
    protected $appends = ['avatar'];

    /** @use HasFactory<UserFactory> */
    use HasFactory, HasRoles, HasWorkspaces, Notifiable, PasskeyAuthenticatable, TwoFactorAuthenticatable;

    /**
     * Bootstrap the model and its traits.
     */
    protected static function booted(): void
    {
        static::creating(function (User $user): void {
            $user->uuid ??= (string) Str::uuid();
        });
    }

    /**
     * Queue the password reset email without delaying the password broker response.
     */
    public function sendPasswordResetNotification(#[\SensitiveParameter] $token): void
    {
        $this->notify(new ResetPassword($token));
    }

    /**
     * Get the public URL for the user's uploaded or generated avatar.
     *
     * @return Attribute<string, never>
     */
    protected function avatar(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $value, array $attributes): string => filled($attributes['avatar_path'] ?? null)
                ? Storage::disk('public')->url($attributes['avatar_path'])
                : URL::signedRoute('avatars.show', [
                    'style' => DiceBearAvatarGenerator::CRITTERS,
                    'seed' => (string) ($attributes['uuid'] ?? 'user'),
                ], absolute: false),
        );
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }
}
