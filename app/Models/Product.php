<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Product extends Model
{
    use HasFactory;
    use HasUlids;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'book_id',
        'sku',
        'name',
        'stock',
        'price',
        'description',
        'link_shopee',
        'link_tokopedia',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var string[]
     */
    protected $casts = [
        'price' => 'integer',
    ];

    /**
     * Interacts with the product's name.
     *
     * Sets the name to Sentence case.
     */
    protected function name(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => str()->ucfirst($value),
        );
    }

    /**
     * Interacts with the product's sku.
     *
     * Sets the sku to uppercase.
     */
    protected function sku(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => str()->upper($value),
        );
    }

    /**
     * Interacts with the product's description.
     *
     * Sets the description to Sentence case.
     */
    protected function description(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => str()->ucfirst($value),
        );
    }

    /**
     * The book that related to product.
     */
    public function book(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    /**
     * Get all product's photos.
     */
    public function photos(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }
}
