<?php

use App\Http\Controllers\HomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index'])
    ->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware('admin-only')->group(function () {
        Route::get('/dashboard', fn () => Inertia::render('Dashboard'))
            ->name('dashboard');

        Route::resource('books', 'App\Http\Controllers\BookController');

        Route::resource('publishers', 'App\Http\Controllers\PublisherController')
            ->only(['store']);

        Route::resource('categories', 'App\Http\Controllers\CategoryController')
            ->only(['store']);

        Route::resource('authors', 'App\Http\Controllers\AuthorController')
            ->only(['store']);

        Route::resource('products', 'App\Http\Controllers\ProductController');

        Route::post('products/export', ['App\Http\Controllers\ProductController', 'exportExcel'])
            ->name('products.export');

        Route::get('bulk/add/download', ['App\Http\Controllers\BulkController', 'downloadAddBulkTemplate'])
            ->name('bulk.add.download');

        Route::post('bulk/add/upload', ['App\Http\Controllers\BulkController', 'uploadAddBulkTemplate'])
            ->name('bulk.add.upload');

        Route::resource('images', 'App\Http\Controllers\ImageController');
    });

    Route::get('/settings', fn () => Inertia::render('Settings'))
        ->name('settings');
});

require __DIR__.'/auth.php';
