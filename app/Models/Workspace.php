<?php

namespace App\Models;

use App\Concerns\GeneratesUniqueWorkspaceSlugs;
use App\Enums\WorkspaceRole;
use App\Services\DiceBearAvatarGenerator;
use Database\Factories\WorkspaceFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $uuid
 * @property string $name
 * @property string $slug
 * @property string|null $logo_path
 * @property bool $is_personal
 * @property-read string $logo
 */
#[Fillable([
    'name',
    'slug',
    'logo_path',
    'is_personal',
])]
class Workspace extends Model
{
    /** @use HasFactory<WorkspaceFactory> */
    use GeneratesUniqueWorkspaceSlugs, HasFactory, SoftDeletes;

    /** @var list<string> */
    protected $appends = ['logo'];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Workspace $workspace): void {
            $workspace->uuid ??= (string) Str::uuid();

            if (blank($workspace->slug)) {
                $workspace->slug = static::generateUniqueWorkspaceSlug($workspace->name);
            }
        });

        static::updating(function (Workspace $workspace): void {
            if ($workspace->isDirty('name')) {
                $workspace->slug = static::generateUniqueWorkspaceSlug($workspace->name, $workspace->id);
            }
        });
    }

    /** @return Attribute<string, never> */
    protected function logo(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $value, array $attributes): string => filled($attributes['logo_path'] ?? null)
                ? Storage::disk('public')->url($attributes['logo_path'])
                : URL::signedRoute('avatars.show', [
                    'style' => DiceBearAvatarGenerator::LOOPS,
                    'seed' => (string) ($attributes['uuid'] ?? 'workspace'),
                ], absolute: false),
        );
    }

    public function owner(): ?Model
    {
        return $this->members()
            ->wherePivot('role', WorkspaceRole::Owner->value)
            ->first();
    }

    /** @return BelongsToMany<User, $this, Membership, 'pivot'> */
    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'workspace_members', 'workspace_id', 'user_id')
            ->using(Membership::class)
            ->withPivot(['role'])
            ->withTimestamps();
    }

    /** @return HasMany<Membership, $this> */
    public function memberships(): HasMany
    {
        return $this->hasMany(Membership::class);
    }

    /** @return HasMany<WorkspaceInvitation, $this> */
    public function invitations(): HasMany
    {
        return $this->hasMany(WorkspaceInvitation::class);
    }

    /** @return array<string, string> */
    protected function casts(): array
    {
        return [
            'is_personal' => 'boolean',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
