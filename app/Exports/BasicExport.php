<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class BasicExport implements WithMultipleSheets
{
    use Exportable;

    /**
     * The sheets.
     */
    protected array $sheets = [];

    /**
     * Get all sheets.
     */
    public function sheets(): array
    {
        return $this->sheets;
    }

    /**
     * Add new sheet to file.
     */
    public function addSheet($sheet): self
    {
        array_push($this->sheets, $sheet);

        return $this;
    }
}
