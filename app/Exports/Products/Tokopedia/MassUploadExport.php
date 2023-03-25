<?php

namespace App\Exports\Products\Tokopedia;

use App\Exports\BasicExport;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\WithProperties;

/**
 * Set the products collection to exported.
 *
 * Required to load the book and photos relationship manually.
 */
class MassUploadExport extends BasicExport implements WithProperties
{
    public function __construct(Collection $products)
    {
        $this->sheets = [
            new MassUploadTemplateSheet($products),
        ];
    }

    public function properties(): array
    {
        return [
            'subject' => config('export.product.tokopedia.subject'),
        ];
    }
}
