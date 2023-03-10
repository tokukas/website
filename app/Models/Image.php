<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Image extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'caption',
        'path',
    ];

    /**
     * Get the parent imageable model.
     */
    public function imageable(): MorphTo
    {
        return $this->morphTo(__FUNCTION__, 'imageable_type', 'imageable_id');
    }

    /**
     * Interacts with the image's caption.
     *
     * Sets the caption to Sentence case.
     */
    protected function caption(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => str()->ucfirst($value),
        );
    }

    /**
     * Interacts with the image's path.
     *
     * Sets the path to lowercase.
     */
    protected function path(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => str()->lower($value),
        );
    }
}
