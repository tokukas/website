<?php

namespace App\Exports\Products;

use App\Models\Image;
use App\Models\Product;
use Illuminate\Database\Eloquent\RelationNotFoundException;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

/**
 * Set the products collection to exported.
 *
 * Required to load the book and photos relationship manually.
 */
class ProductsExportShopee extends ProductsExport implements WithStyles
{
    public function headings(): array
    {
        return [
            // first row: key
            [
                'ps_category',
                'ps_product_name',
                'ps_product_description',
                'ps_sku_parent_short',
                'ps_dangerous_goods',
                'et_title_variation_integration_no',
                'et_title_variation_1',
                'et_title_option_for_variation_1',
                'et_title_image_per_variation',
                'et_title_variation_2',
                'et_title_option_for_variation_2',
                'ps_price',
                'ps_stock',
                'ps_sku_short',
                'ps_new_size_chart',
                'ps_item_cover_image',
                'ps_item_image_1',
                'ps_item_image_2',
                'ps_item_image_3',
                'ps_item_image_4',
                'ps_item_image_5',
                'ps_item_image_6',
                'ps_item_image_7',
                'ps_item_image_8',
                'ps_weight',
                'ps_length',
                'ps_width',
                'ps_height',
                'channel_id_8003',
                'channel_id_8005',
                'channel_id_8006',
                'ps_product_pre_order_dts',
            ],
            // second row: heading name
            [
                'Kategori',
                'Nama Produk',
                'Deskripsi Produk',
                'SKU Induk',
                'Produk Berbahaya',
                'Kode Integrasi Variasi',
                'Nama Variasi 1',
                'Varian untuk Variasi 1',
                'Foto Produk per Varian',
                'Nama Variasi 2',
                'Varian untuk Variasi 2',
                'Harga',
                'Stok',
                'Kode Variasi',
                'Panduan Ukuran',
                'Foto Sampul',
                'Foto Produk 1',
                'Foto Produk 2',
                'Foto Produk 3',
                'Foto Produk 4',
                'Foto Produk 5',
                'Foto Produk 6',
                'Foto Produk 7',
                'Foto Produk 8',
                'Berat',
                'Panjang',
                'Lebar',
                'Tinggi',
                'Reguler (Cashless)',
                'Hemat',
                'Kargo',
                'Dikirim dalam Pre-order',
            ],
            // third row: required or not
            [
                '<required/not>'
            ],
            // fourth row: column description
            [
                '<column description>',
            ],
            // fifth row: value guide
            [
                '<value guide>',
            ],
        ];
    }

    /**
     * @param  Product  $product
     */
    public function map($product): array
    {
        if (! (
            $product->relationLoaded('book')
            || $product->relationLoaded('photos')
        )) {
            throw new RelationNotFoundException('book or photos relationship is required to loaded');
        }

        $photoUrls = $product->photos->map(
            fn (Image $photo) => $photo->path ? url($photo->path) : null
        )->toArray();

        // Fill photo urls to be 9 item with `null`.
        for ($i = 0; $i < 9; $i++) {
            if (empty($photoUrls[$i])) {
                array_push($photoUrls, null);
            }
        }

        return [
            null, // kategori
            $product->name,
            $product->description,
            $product->sku,
            'No (ID)',
            null, // kode integrasi variasi
            null,
            null,
            null,
            null,
            null, // varian untuk variasi 2
            $product->price,
            $product->stock,
            null, // kode variasi
            null, // panduan ukuran
            ...$photoUrls,
            $product->book->weight,
            null, // panjang
            null, // lebar
            null, // tinggi
            'Aktif',
            'Aktif',
            'Aktif',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $sheet->getRowDimension('1')->setVisible(false);

        return [
            2 => [
                'font' => [
                    'bold' => true,
                ],
            ],
        ];
    }

    public function columnFormats(): array
    {
        return [
            'Y' => NumberFormat::FORMAT_NUMBER,
            'Z' => NumberFormat::FORMAT_NUMBER,
            'AA' => NumberFormat::FORMAT_NUMBER,
            'AB' => NumberFormat::FORMAT_NUMBER,
        ];
    }
}
