<?php

namespace App\Exports\AddBulkTemplate;

use App\Exports\BasicSheet;

class ProductsSheet extends BasicSheet
{
    const columnKeys = [
        'sku',
        'name',
        'price',
        'stock',
        'description',
        'photo_1',
        'photo_2',
        'photo_3',
        'photo_4',
        'photo_5',
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
            'required',
            'optional',
            'optional',
            'optional',
            'optional',
        ],
    ];

    public function __construct()
    {
        $this->data = collect();
    }
}
