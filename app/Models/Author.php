<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;
    use HasUlids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
    ];

    /**
     * Interacts with the author's name.
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
     * The books that belong to the author.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function books()
    {
        return $this->belongsToMany(Book::class, BookAuthor::TABLE_NAME)
            ->using(BookAuthor::class);
    }
}
