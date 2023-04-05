<?php

namespace App\Exports\Products;

use App\Models\Product;
use Illuminate\Support\Arr;

class Utils
{
    public static function generateDescription(Product $product): string
    {
        $book = $product->book;
        $bookData = [
            'title' => $book->title,
            'author_names' => count($book->authors) > 0
                ? Arr::join($book->authors->map(fn ($author) => $author->name)->toArray(), ', ')
                : '-',
            'publisher' => $book->publisher->name ?? '-',
            'year_published' => $book->year_published,
            'language' => $book->language_code,
            'width' => $book->width,
            'height' => $book->height,
            'num_of_pages' => $book->num_of_pages,
            'isbn' => $book->isbn ?? '-',
            'book_desc' => $book->description ?? '-',
        ];

        return <<<DESC
        !!! INI BUKU BEKAS !!!
        Jadi harap maklum jika kondisi sampul sudah tidak mulus, ada coret-coretan, ada bekas-bekas lipatan, dan ada sedikit sobek / koyak di ujung-ujung halaman. Namanya juga BUKU BEKAS :)

        => Judul Buku: {$bookData['title']}
        => Penulis: {$bookData['author_names']}
        => Penerbit: {$bookData['publisher']}
        => Tahun Terbit: {$bookData['year_published']}
        => Bahasa: {$bookData['language']}
        => Dimensi Buku: {$book->width} cm X {$book->height} cm
        => Tebal Buku: {$bookData['num_of_pages']} halaman
        => ISBN: {$bookData['isbn']}
        => Deskripsi Buku: {$bookData['book_desc']}
        DESC;
    }
}
