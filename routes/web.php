<?php

use App\Http\Controllers\HomeController;
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

Route::middleware('lang')->group(function () {
    Route::get('/', [HomeController::class, 'index'])
        ->name('home');

    Route::resource('products', 'App\Http\Controllers\ProductController');

    Route::resource('images', App\Http\Controllers\ImageController::class)
        ->only(['show', 'destroy']);

    Route::get('/settings', ['App\Http\Controllers\SettingsController', 'language'])
        ->name('settings');

    Route::controller('App\Http\Controllers\SettingsController')
        ->prefix('settings')
        ->name('settings.')
        ->group(function () {
            Route::get('/language', 'language')->name('language');
            Route::post('/language', 'setLanguage')->name('language.set');
            Route::get('/appearance', 'appearance')->name('appearance');
        });

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

            Route::post('products/export', ['App\Http\Controllers\ProductController', 'exportExcel'])
                ->name('products.export');
        });
    });
});

require __DIR__.'/auth.php';
