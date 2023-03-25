<?php

namespace App\Exports\Products\Tokopedia;

use App\Exports\BasicSheet;
use App\Models\Image;
use Exception;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class MassUploadTemplateSheet extends BasicSheet implements FromCollection, WithMapping, WithStyles
{
    const columnNames = [
        'Pesan Error',
        'Nama Produk*',
        'Deskripsi Produk',
        'Kode Kategori*',
        'Berat* (Gram)',
        'Minimum Pemesanan*',
        'Nomor Etalase',
        'Waktu Proses Preorder',
        'Kondisi*',
        'Foto Produk 1*',
        'Foto Produk 2',
        'Foto Produk 3',
        'Foto Produk 4',
        'Foto Produk 5',
        'URL Video Produk 1',
        'URL Video Produk 2',
        'URL Video Produk 3',
        'SKU Name',
        'Status*',
        'Jumlah Stok*',
        'Harga (Rp)*',
        'Kurir Pengiriman*',
        'Asuransi Pengiriman*',
    ];

    /**
     * The data to render.
     */
    protected Collection|null $data;

    protected string $name = 'ISI Template Impor Produk';

    protected array $headings = [
        [''],
        self::columnNames,
        [''],
    ];

    protected array $columnFormats = [
        'E' => NumberFormat::FORMAT_NUMBER,
    ];

    public function __construct(Collection $products)
    {
        $this->data = $products;
    }

    public function collection()
    {
        return $this->data;
    }

    /**
     * @param  Product  $product
     */
    public function map($product): array
    {
        if (! ($product->relationLoaded('book') || $product->relationLoaded('photos'))) {
            throw new Exception('book or photos relationship is required to loaded');
        }

        $photoUrls = $product->photos->map(
            fn (Image $photo) => $photo->path ? url($photo->path) : null
        )->toArray();

        // Fill photo urls to be 5 item with `null`.
        for ($i = 0; $i < 5; $i++) {
            if (empty($photoUrls[$i])) {
                array_push($photoUrls, null);
            }
        }

        return [
            null, // Pesan error
            $product->name,
            $product->description,
            null,
            $product->book->weight,
            1, // Minimum pemesanan
            null, // Nomor etalase
            null, // Waktu proses preorder
            'Bekas',
            ...$photoUrls,
            null, // URL video produk 1
            null, // URL video produk 2
            null, // URL video produk 3
            $product->sku,
            'Aktif',
            $product->stock,
            $product->price,
            '33,51,43,44,18,55,27,2,6,22,1',
            'Opsional',
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
}
