<?php

namespace App\Exports\Products\Shopee;

use App\Exports\BasicExport;
use App\Exports\BasicSheet;
use App\Exports\Products\Shopee\Sheets\TemplateSheet;
use Illuminate\Support\Collection;

/**
 * Set the products collection to exported.
 *
 * Required to load the book and photos relationship manually.
 */
class Export extends BasicExport
{
    public function __construct(Collection $products)
    {
        $this->sheets = [
            new BasicSheet('type', collect([
                ['<required-blank-row>'],
                ['basic', '220309_sizechart'],
            ])),
            new TemplateSheet($products),
            new BasicSheet('required_blank_sheet'),
            new BasicSheet('required_sheet', collect([['mass_new_basic']])), // `mass_new_basic` is required key
        ];
    }
}
