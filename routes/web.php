<?php

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
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

        Route::resource('products', 'App\Http\Controllers\ProductController');

        Route::resource('images', 'App\Http\Controllers\ImageController');
    });

    Route::get('/settings', fn () => Inertia::render('Settings'))
        ->name('settings');
});

require __DIR__ . '/auth.php';
