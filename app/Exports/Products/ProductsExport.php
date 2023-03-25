<?php

namespace App\Exports\Products;

use App\Models\Image;
use App\Models\Product;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class ProductsExport implements FromCollection, WithColumnFormatting, WithHeadings, WithMapping, WithStrictNullComparison
{
    use Exportable;

    private Collection $products;

    /**
     * Set the products collection to exported.
     *
     * If needed, load the photos relationship manually.
     */
    public function __construct(Collection $products)
    {
        $this->products = $products;
    }

    public function collection()
    {
        return $this->products;
    }

    public function headings(): array
    {
        return [
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

    public function columnFormats(): array
    {
        return [
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
    }
}
