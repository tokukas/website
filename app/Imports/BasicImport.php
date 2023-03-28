<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class BasicImport implements WithMultipleSheets
{
    use Importable;

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
