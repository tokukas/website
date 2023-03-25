<?php

namespace App\Http\Controllers;

use App\Exports\Products\Shopee\Export as ProductsExportShopee;
use App\Exports\Products\Templates\Default\Export as ProductsExport;
use App\Http\Requests\ExportProductRequest;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Book;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): InertiaResponse
    {
        return Inertia::render('Products/Index', [
            'products' => Product::all()->load('book'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): InertiaResponse
    {
        return Inertia::render('Products/Form', [
            'books' => Book::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $product = Product::create($validated);

        if (
            $product
            && $validated['photos']
            && $this->uploadPhotos($product, $validated['photos'])
        ) {
            $this->setFlashSuccess('Product added successfully');

            return redirect()->intended(route('products.show', $product));
        }

        $this->setFlashError('failed to add the product');

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): InertiaResponse
    {
        return Inertia::render('Products/Show', [
            'product' => ProductResource::make(
                $product->load('book', 'photos'),
            ),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product): InertiaResponse
    {
        return Inertia::render('Products/Form', [
            'books' => Book::all(),
            'productToEdit' => ProductResource::make(
                $product->load('book', 'photos'),
            ),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $validated = $request->validated();
        $success = $product->update($validated);

        if ($success && $validated['photos']) {
            $success = $this->uploadPhotos($product, $validated['photos']);
        }

        if ($success) {
            $this->setFlashSuccess('Product updated successfully');

            return redirect()->intended(route('products.show', $product));
        }

        $this->setFlashError('Failed to update the product');

        return back();
    }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(Product $product): RedirectResponse
    // {
    //     //
    // }

    /**
     * Upload the product's photo(s).
     *
     * @param  UploadedFile[]  $photos
     * @return bool True if all photos were saved successfully, false otherwise.
     */
    protected function uploadPhotos(Product $product, array $photos): bool
    {
        $statuses = array_map(function (UploadedFile $photo) use ($product) {
            // Save the photo file into images folder.
            $path = Storage::putFile('images', $photo);

            if (! $path) {
                return false;
            }

            // Create a new photo record in the database.
            $photoProduct = $product->photos()->create([
                'path' => $path,
                'caption' => $photo->getClientOriginalName(),
            ]);

            if (! $photoProduct) {
                return false;
            }

            return true;
        }, $photos);

        return ! in_array(false, $statuses);
    }

    /**
     * Export the products to excel.
     */
    public function exportExcel(ExportProductRequest $request)
    {
        ['ids' => $ids, 'template' => $template] = $request->validated();

        $products = Product::with(['book', 'photos'])->findMany($ids);
        $fileName = 'products-'.$template.'-'.time().'-'.($ids ? count($ids) : 'all').'.xlsx';

        switch ($template) {
            case 'mass-upload-shopee':
                $fileExport = new ProductsExportShopee($products);
                break;
            default:
                $fileExport = new ProductsExport($products);
                break;
        }

        $fileExport->queue($fileName, 'public');

        // Get exported file from public
        if (Storage::disk('public')->exists($fileName)) {
            return Inertia::location(url(Storage::url($fileName)));
        }

        $this->setFlashError('Failed to export products to excel');

        return back();
    }
}
