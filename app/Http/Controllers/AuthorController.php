<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use App\Models\Author;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;

class AuthorController extends Controller
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
    public function store(StoreAuthorRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $author = Author::create($validated);

        if ($author) {
            return back()->with('success', 'Author created successfully.');
        }

        return back()->with('error', 'Author could not be created.');
    }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(Author $author): Response
    // {
    //     //
    // }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(Author $author): Response
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(UpdateAuthorRequest $request, Author $author): RedirectResponse
    // {
    //     //
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(Author $author): RedirectResponse
    // {
    //     //
    // }
}
