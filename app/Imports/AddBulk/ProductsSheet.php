<?php

namespace App\Imports\AddBulk;

use App\Http\Requests\StoreProductRequest;
use App\Models\Product;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProductsSheet implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        // Skip description rows.
        $rows = $rows->skip(2);

        // Validator::make(
        //     $rows->toArray(),
        //     array_merge((new StoreProductRequest())->rules(), [
        //         'book_id' => ['required'],
        //     ]),
        // )->validate();

        foreach ($rows as $row) {
            // Product::create([
            //     'book_id' => $row['book_id'],
            //     'name' => $row['name'],
            //     'sku' => $row['sku'],
            //     'stock' => $row['stock'],
            //     'price' => $row['price'],
            //     'photo_1' => $row['photo_1'],
            //     'photo_2' => $row['photo_2'],
            //     'photo_3' => $row['photo_3'],
            //     'photo_4' => $row['photo_4'],
            //     'photo_5' => $row['photo_5'],
            //     'description' => $row['description'],
            // ]);
        }
    }

    public function prepareForValidation($data, $index)
    {
        return $data;
    }
}
