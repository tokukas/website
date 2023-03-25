<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;
use Maatwebsite\Excel\Concerns\WithTitle;

class BasicSheet implements FromCollection, WithColumnFormatting, WithHeadings, WithStrictNullComparison, WithTitle
{
    /**
     * The data to render.
     */
    protected Collection|null $data;

    /**
     * The name of the sheet.
     */
    protected string $name;

    /**
     * The format apply to columns.
     */
    protected array $columnFormats = [];

    /**
     * The headings of the sheet.
     */
    protected array $headings = [];

    /**
     * Create basic sheet with specific name and data collection.
     */
    public function __construct(string $name, Collection|null $data = null)
    {
        $this->data = $data;
        $this->name = $name;
    }

    /**
     * Get the data collection of this sheet.
     */
    public function collection()
    {
        return $this->data ?? collect();
    }

    /**
     * Get the headings of the sheet.
     */
    public function headings(): array
    {
        return $this->headings;
    }

    /**
     * Set headings of the sheet.
     *
     * See https://docs.laravel-excel.com/3.1/exports/mapping.html#adding-a-heading-row
     */
    public function setHeadings(array $headings): self
    {
        $this->headings = $headings;

        return $this;
    }

    /**
     * Get the title a.k.a name of the sheet.
     */
    public function title(): string
    {
        return $this->name;
    }

    /**
     * Get the column formats.
     */
    public function columnFormats(): array
    {
        return $this->columnFormats;
    }

    /**
     * Apply format to specified columns.
     *
     * See https://docs.laravel-excel.com/3.1/exports/column-formatting.html
     */
    public function setColumnFormat(array $columnFormats): self
    {
        $this->columnFormats = $columnFormats;

        return $this;
    }
}
