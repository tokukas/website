<?php

namespace App\Exports\Products\Default;

use App\Exports\BasicExport;
use Illuminate\Support\Collection;

class Export extends BasicExport
{
    public function __construct(Collection $products)
    {
        $this->sheets = [
            new Sheet($products),
        ];
    }
}
