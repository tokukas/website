<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePublisherRequest;
use App\Models\Publisher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PublisherController extends Controller
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
    public function store(StorePublisherRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $publisher = Publisher::create($validated);

        if ($publisher) {
            $this->setFlashSuccess('Publisher added successfully');
        } else {
            $this->setFlashError('Failed to add the publisher');
        }

        return back();
    }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(Publisher $publisher): Response
    // {
    //     //
    // }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(Publisher $publisher): Response
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, Publisher $publisher): RedirectResponse
    // {
    //     //
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(Publisher $publisher): RedirectResponse
    // {
    //     //
    // }
}
