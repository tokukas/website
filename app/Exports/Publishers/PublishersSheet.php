<?php

namespace App\Exports\Publishers;

use App\Exports\BasicSheet;
use App\Models\Publisher;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class PublishersSheet extends BasicSheet implements WithMapping, WithStyles
{
    const DATE_COLUMNS = [
        'created_at',
        'updated_at',
    ];

    protected string $name = 'Publishers';

    protected array $headings = [
        'ID',
        'Name',
        'Slug',
    ];

    protected array $mapping = [
        'id',
        'name',
        'slug',
    ];

    protected array $columnFormats = [
        'D' => NumberFormat::FORMAT_DATE_DATETIME,
        'E' => NumberFormat::FORMAT_DATE_DATETIME,
    ];

    public function __construct(bool $withDateColumns = false)
    {
        $this->data = Publisher::all();

        if ($withDateColumns) {
            $this->headings = array_merge($this->headings, [
                'Created At',
                'Updated At',
            ]);

            $this->mapping = array_merge($this->mapping, self::DATE_COLUMNS);
        }
    }

    public function map($publisher): array
    {
        $data = [];

        foreach ($this->mapping as $column) {
            if (in_array($column, self::DATE_COLUMNS)) {
                $data[] = Date::dateTimeToExcel($publisher->{$column});
            } else {
                $data[] = $publisher->{$column};
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
