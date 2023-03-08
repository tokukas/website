<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
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
     * Instantiate a new controller instance.
     */
    public function __construct()
    {
        $this->middleware('to')->only('create');
    }

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
        return Inertia::render('Books/Form', [
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
            return redirect()->intended(route('books.show', [$book]));
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

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Book $book): InertiaResponse
    {
        return Inertia::render('Books/Form', [
            'authors' => Author::all(),
            'bookToEdit' => $book->load('publisher', 'authors', 'category'),
            'categories' => Category::all(),
            'publishers' => Publisher::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book): RedirectResponse
    {
        $validated = $request->validated();

        if ($book->update($validated)) {
            $book->authors()->sync($validated['author_ids'] ?? []);
            return redirect()->intended(route('books.show', [$book]));
        }

        return back()->withErrors([
            'error' => 'Error updating book',
        ]);
    }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(Book $book): RedirectResponse
    // {
    //     //
    // }
}
