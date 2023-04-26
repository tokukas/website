<?php

namespace App\Services;

use App\Models\Image;
use Illuminate\Http\Response;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image as IImage;

class ImageService
{
    /**
     * Get an image.
     *
     * @param  Image|string  $imageOrId The image or the image id.
     * @param  array  $options The options.
     *
     * - `height`: The height of the image.
     * - `quality`: The quality of the image.
     * - `type`: The type of the image.
     * - `width`: The width of the image.
     */
    public function get(Image|string $imageOrId, array $options = []): Response
    {
        $image = $imageOrId instanceof Image
            ? $imageOrId
            : Image::findOrFail($imageOrId);

        $img = IImage::make(Storage::get($image->path));

        if (isset($options['width'])) {
            $img->widen($options['width']);
        }

        if (isset($options['height'])) {
            $img->heighten($options['height']);
        }

        if (isset($options['width']) && isset($options['height'])) {
            $img->resize($options['width'], $options['height']);
        }

        if (isset($options['quality'])) {
            $img->quality($options['quality']);
        }

        if (isset($options['type'])) {
            $img->encode($options['type']);
        }

        return $img->response();
    }

    /**
     * Save uploaded image.
     *
     * @param  UploadedFile  $image The uploaded image.
     * @return string|null The path of the image.
     */
    public function store(UploadedFile $image): string|null
    {
        IImage::make($image)
            ->orientate()
            ->save($image->hashName(Storage::path('images')));

        return Storage::exists($image->hashName('images'))
            ? $image->hashName('images')
            : null;
    }

    /**
     * Delete an image.
     *
     * @param  Image|string  $imageOrId The image or the image id.
     */
    public function delete(Image|string $imageOrId): bool
    {
        $image = $imageOrId instanceof Image
            ? $imageOrId
            : Image::findOrFail($imageOrId);

        return Storage::delete($image->path) && $image->delete();
    }
}
