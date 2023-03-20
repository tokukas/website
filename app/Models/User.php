<?php

namespace App\Models;

use App\Enums\Roles;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens;
    use HasFactory;
    use HasUlids;
    use Notifiable;
    use CanResetPassword;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var string[]
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Interacts with the user's name.
     *
     * Sets the name to UPPER CASE.
     * Casts the name to Title Case.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute.
     */
    protected function name(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => str()->upper($value),
            get: fn ($value) => str()->title($value),
        );
    }

    /**
     * Interacts with the user's email address.
     *
     * Set the email address to lower case.
     */
    protected function email(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => str()->lower($value),
        );
    }

    /**
     * Get the user's role.
     */
    public function role()
    {
        return $this->belongsTo(Role::class, 'role_key', (new Role)->getKeyName());
    }

    /**
     * Check if a user has specific role.
     *
     * @param  string|null  $role The role key.
     */
    public function hasRole(string|null $role): bool
    {
        return $this->role?->key === $role;
    }

    /**
     * Check if a user is an admin.
     */
    public function isAdmin(): bool
    {
        return $this->hasRole(Roles::ADMIN);
    }
}
