<?php

namespace App\Exports\Products\Templates\Shopee;

use App\Exports\BasicExport;
use App\Exports\BasicSheet;
use Illuminate\Support\Collection;

/**
 * Set the products collection to exported.
 *
 * Required to load the book and photos relationship manually.
 */
class MassUploadExport extends BasicExport
{
    public function __construct(Collection $products)
    {
        $this->sheets = [
            new BasicSheet('type', collect([
                ['<required-blank-row>'],
                ['basic', '220309_sizechart'],
            ])),
            new MassUploadTemplateSheet($products),
            new BasicSheet('required_blank_sheet'),
            new BasicSheet('required_sheet', collect([['mass_new_basic']])), // `mass_new_basic` is required key
        ];
    }
}
