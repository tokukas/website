<?php

namespace App\Exports\AddBulkTemplate;

use App\Exports\BasicExport;
use App\Exports\Publishers\PublishersSheet;
use Maatwebsite\Excel\Concerns\WithProperties;

class Export extends BasicExport implements WithProperties
{
    public function sheets(): array
    {
        return [
            new ProductsSheet(),
            new BooksSheet(),
            new PublishersSheet(true),
        ];
    }

    public function properties(): array
    {
        return [
            'title' => 'add-bulk-template-'.now()->toDateString().'.xlsx',
            'subject' => bcrypt(config('app.key')),
        ];
    }
}
