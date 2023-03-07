<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Publisher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): InertiaResponse
    {
        return Inertia::render('Books', [
            'books' => Book::with('publisher')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): InertiaResponse
    {
        return Inertia::render('Books/Create', [
            'authors' => Author::all(),
            'categories' => Category::all(),
            'data' => [
                'title' => $request->input('title')
            ],
            'publishers' => Publisher::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $book = Book::create($validated);
        $book->authors()->sync($validated['author_ids'] ?? []);

        if ($book) {
            // TODO: redirect to detail book page.
            return redirect()->route('books.index');
        }

        return back()->withErrors([
            'error' => 'Error creating book',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book): InertiaResponse
    {
        return Inertia::render('Books/Show', [
            'book' => $book->load('publisher', 'authors', 'category'),
        ]);
    }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(Book $book): Response
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, Book $book): RedirectResponse
    // {
    //     //
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(Book $book): RedirectResponse
    // {
    //     //
    // }
}
