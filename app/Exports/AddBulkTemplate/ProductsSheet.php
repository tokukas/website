<?php

namespace App\Exports\AddBulkTemplate;

use App\Exports\BasicSheet;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ProductsSheet extends BasicSheet implements WithStyles
{
    const columnKeys = [
        'book_id',
        'name',
        'sku',
        'stock',
        'price',
        'photo_1',
        'photo_2',
        'photo_3',
        'photo_4',
        'photo_5',
        'description',
    ];

    protected string $name = 'Products';

    protected array $headings = [
        self::columnKeys,
        [
            'required',
            'required',
            'required',
            'required',
            'required',
            'optional',
            'optional',
            'optional',
            'optional',
            'optional',
            'optional',
        ],
        [
            'Put id, or new book title. Invalid id will be recognized as new book title',
            'Max. 70 characters',
            'Max. 22 characters',
            'Integer. Ex: 100',
            'Integer. Ex: 10000',
            'Valid image URL',
            'Valid image URL',
            'Valid image URL',
            'Valid image URL',
            'Valid image URL',
            'Max. 255 characters',
        ],
    ];

    public function __construct()
    {
        $this->data = collect();
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => [
                'font' => [
                    'bold' => true,
                ],
            ],
        ];
    }
}
