<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $products = ProductResource::collection(
            \App\Models\Product::with('photos')->offset(0)->limit(10)->get()
        );
        $products->withoutWrapping();

        $defaultProductPhoto = config('asset.default_product_photo');

        return Inertia::render('Home', [
            'photoPlaceholder' => $defaultProductPhoto ? url('/images/'.$defaultProductPhoto) : null,
            'products' => $products,
        ]);
    }
}
