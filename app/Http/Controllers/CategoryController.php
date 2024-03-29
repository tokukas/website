<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    // /**
    //  * Display a listing of the resource.
    //  */
    // public function index(): Response
    // {
    //     //
    // }

    // /**
    //  * Show the form for creating a new resource.
    //  */
    // public function create(): Response
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $category = Category::create($validated);

        if ($category) {
            $this->setFlashSuccess('Category added successfully');
        } else {
            $this->setFlashError('Failed to add the category');
        }

        return back();
    }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(Category $category): Response
    // {
    //     //
    // }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(Category $category): Response
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    // {
    //     //
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(Category $category): RedirectResponse
    // {
    //     //
    // }
}
