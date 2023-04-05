<?php

namespace App\Exports\Products;

use App\Models\Product;
use Illuminate\Support\Arr;

class Utils
{
    public static function generateDescription(Product $product): string
    {
        $bookData = [
            'title' => $product->book->title,
            'author_names' => count($product->book->authors) > 0
                ? Arr::join($product->book->authors->map(fn ($author) => $author->name)->toArray(), ', ')
                : '-',
            'publisher' => $product->book->publisher->name ?? '-',
            'year_published' => $product->book->year_published,
            'language' => $product->book->language_code,
            'width' => $product->book->width,
            'height' => $product->book->height,
            'num_of_pages' => $product->book->num_of_pages,
            'isbn' => $product->book->isbn ?? '-',
            'book_desc' => $product->book->description ?? '-',
        ];

        return <<<DESC
        !!! INI BUKU BEKAS !!!
        Jadi harap maklum jika kondisi sampul sudah tidak mulus, ada coret-coretan, ada bekas-bekas lipatan, dan ada sedikit sobek / koyak di ujung-ujung halaman. Namanya juga BUKU BEKAS :)

        => Judul Buku: {$bookData['title']}
        => Penulis: {$bookData['author_names']}
        => Penerbit: {$bookData['publisher']}
        => Tahun Terbit: {$bookData['year_published']}
        => Bahasa: {$bookData['language']}
        => Dimensi Buku: {$bookData['width']} cm X {$bookData['height']} cm
        => Tebal Buku: {$bookData['num_of_pages']} halaman
        => ISBN: {$bookData['isbn']}
        => Deskripsi Buku: {$bookData['book_desc']}
        DESC;
    }
}
