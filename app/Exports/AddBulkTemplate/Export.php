<?php

namespace App\Exports\AddBulkTemplate;

use App\Exports\BasicExport;
use Maatwebsite\Excel\Concerns\WithProperties;

class Export extends BasicExport implements WithProperties
{
    public function sheets(): array
    {
        return [
            new ProductsSheet(),
        ];
    }

    public function properties(): array
    {
        return [
            'title' => 'add-bulk-template-' . now()->toDateString() . '.xlsx',
            'subject' => bcrypt(config('app.key')),
        ];
    }
}
