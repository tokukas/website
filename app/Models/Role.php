<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'key';

    /**
     * The type of the primary key ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'key',
        'name',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        //
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        //
    ];

    /**
     * Interacts with the role's key.
     *
     * Casts the key to lowercase.
     * Sets the key to lowercase and kebab-case.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute.
     */
    protected function key(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => strtolower($value),
            set: fn ($value) => str_replace([' ', '_'], '-', strtolower($value)),
        );
    }

    /**
     * Interacts with the role's name.
     *
     * Casts the name to capitalized.
     * Sets the name to uppercase.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute.
     */
    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => ucwords($value),
            set: fn ($value) => strtoupper($value),
        );
    }

    /**
     * List of users that have this role.
     */
    public function users()
    {
        return $this->hasMany(User::class, 'role_key', $this->getKeyName());
    }
}
