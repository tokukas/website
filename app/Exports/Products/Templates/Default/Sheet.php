<?php

namespace App\Exports\Products\Templates\Default;

use App\Exports\BasicSheet;
use App\Models\Image;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\WithMapping;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class Sheet extends BasicSheet implements WithMapping
{
    protected string $name = 'Products';

    protected array $headings = [
        'id',
        'book_id',
        'sku',
        'name',
        'price',
        'stock',
        'description',
        'created_at',
        'updated_at',
        'photo_1',
        'photo_2',
        'photo_3',
        'photo_4',
        'photo_5',
    ];

    protected array $columnFormats = [
        'A' => '@',
        'B' => '@',
        'C' => '@',
        'D' => '@',
        'E' => 'Rp#,##0.00_-',
        'F' => NumberFormat::FORMAT_NUMBER,
        'G' => '@',
        'H' => NumberFormat::FORMAT_DATE_DATETIME,
        'I' => NumberFormat::FORMAT_DATE_DATETIME,
        'J' => '@',
        'K' => '@',
        'L' => '@',
        'M' => '@',
        'N' => '@',
    ];

    public function __construct(Collection $products)
    {
        $this->data = $products;
    }

    /**
     * @param  Product  $product
     */
    public function map($product): array
    {
        $photoUrls = $product->relationLoaded('photos')
        ? $product->photos->map(fn (Image $photo) => $photo->path ? url($photo->path) : null)
            : [];

        return [
            $product->id,
            $product->book_id,
            $product->sku,
            $product->name,
            $product->price,
            $product->stock,
            $product->description,
            Date::dateTimeToExcel($product->created_at),
            Date::dateTimeToExcel($product->updated_at),
            ...$photoUrls,
        ];
    }
}
