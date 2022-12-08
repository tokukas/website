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
     * Sets the key to kebab-case.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute.
     */
    protected function key(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => str($value)->lower()->kebab(),
        );
    }

    /**
     * Interacts with the role's name.
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
     * List of users that have this role.
     */
    public function users()
    {
        return $this->hasMany(User::class, 'role_key', $this->getKeyName());
    }
}
