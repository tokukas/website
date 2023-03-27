<?php

namespace App\Exports\AddBulkTemplate;

use App\Exports\BasicSheet;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class BooksSheet extends BasicSheet implements WithStyles
{
    const columnKeys = [
        'title',
        'publisher_id',
        'year_published',
        'language_code',
        'width',
        'height',
        'weight',
        'num_of_pages',
        'category_id',
        'isbn',
        'authors',
        'description',
    ];

    protected string $name = 'Books';

    protected array $headings = [
        self::columnKeys,
        [
            'required',
            'optional',
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
        ],
        [
            'Max. 255 characters',
            'Put id, or new publisher name. Invalid id will be recognized as new publisher name',
            '4 digits integer',
            '2 characters. Ex: id',
            'Decimal in centimeters, max. 1 point. Ex: 12.5',
            'Decimal in centimeters, max. 1 point. Ex: 12.5',
            'Decimal in grams, max. 1 point. Ex: 12.5',
            'Integer. Ex: 100',
            'Put an id, or a new category name. If want to put an id, make sure is valid or it will be recognize as new category name',
            'Alphanumeric and dash allowed. Max. 17 characters',
            'Separate author names with ; and new author will added automatically if not already exists',
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
