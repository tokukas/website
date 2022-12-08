<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    use HasUlids;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'title',
        'publisher_id',
        'year_published',
        'language_code',
        'width',
        'height',
        'weight',
        'num_of_pages',
        'category_id',
        'isbn',
        'description',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var string[]
     */
    protected $casts = [
        'year_published' => 'integer',
        'width' => 'float',
        'height' => 'float',
        'weight' => 'float',
        'num_of_pages' => 'integer',
    ];

    /**
     * Interacts with the book's title.
     *
     * Sets the title to Sentence case.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute.
     */
    protected function title(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => str()->ucfirst($value),
        );
    }

    /**
     * Interacts with the book's description.
     *
     * Sets the description to Sentence case.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute.
     */
    protected function description(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => str()->ucfirst($value),
        );
    }

    /**
     * The book publisher.
     *
     * @param \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function publisher()
    {
        return $this->belongsTo(Publisher::class);
    }

    /**
     * The book category.
     *
     * @param \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * The book authors.
     *
     * @param \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function authors()
    {
        return $this->belongsToMany(Author::class, BookAuthor::TABLE_NAME)
            ->using(BookAuthor::class);
    }
}
