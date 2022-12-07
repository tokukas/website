<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;
    use HasUlids;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
    ];

    /**
     * Interacts with the category's name.
     *
     * Sets the name to kebab-case.
     * Casts the name to Title Case.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute.
     */
    protected function name(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => Str::kebab(Str::lower($value)),
            get: fn ($value) => Str::replace('-', ' ', Str::title($value)),
        );
    }
}
