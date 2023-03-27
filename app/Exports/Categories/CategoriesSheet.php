<?php

namespace App\Exports\Categories;

use App\Exports\BasicSheet;
use App\Models\Category;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class CategoriesSheet extends BasicSheet implements WithMapping, WithStyles
{
    const DATE_COLUMNS = [
        'created_at',
        'updated_at',
    ];

    protected string $name = 'Categories';

    protected array $headings = [
        'ID',
        'Name',
    ];

    protected array $mapping = [
        'id',
        'name',
    ];

    protected array $columnFormats = [
        'D' => NumberFormat::FORMAT_DATE_DATETIME,
        'E' => NumberFormat::FORMAT_DATE_DATETIME,
    ];

    public function __construct(bool $withDateColumns = false)
    {
        $this->data = Category::all();

        if ($withDateColumns) {
            $this->headings = array_merge($this->headings, [
                'Created At',
                'Updated At',
            ]);

            $this->mapping = array_merge($this->mapping, self::DATE_COLUMNS);
        }
    }

    public function map($category): array
    {
        $data = [];

        foreach ($this->mapping as $column) {
            if (in_array($column, self::DATE_COLUMNS)) {
                $data[] = Date::dateTimeToExcel($category->{$column});
            } else {
                $data[] = $category->{$column};
            }
        }

        return $data;
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
