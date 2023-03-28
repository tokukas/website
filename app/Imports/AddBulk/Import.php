<?php

namespace App\Imports\AddBulk;

use App\Imports\BasicImport;

class Import extends BasicImport
{
    public function sheets(): array
    {
        return [
            'Books' => new BooksSheet(),
        ];
    }
}
