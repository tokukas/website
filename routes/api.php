<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/translate', ['App\Http\Controllers\LanguageController', 'translate'])
    ->name('translate');

// TODO: merge this route with `images` resource route.
Route::get('img/{image}', [App\Http\Controllers\ImageController::class, 'show'])
    ->name('images.show');
