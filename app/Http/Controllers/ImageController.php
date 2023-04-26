<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Services\ImageService;
use App\Traits\ApiResponser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ImageController extends Controller
{
    use ApiResponser;

    protected ImageService $imageService;

    public function __construct()
    {
        $this->middleware(['auth', 'verified'])->except(['show']);

        $this->imageService = new ImageService();
    }

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

    // /**
    //  * Store a newly created resource in storage.
    //  */
    // public function store(Request $request): RedirectResponse
    // {
    //     //
    // }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Image $image)
    {
        $options = [];

        try {
            $options = $request->validate([
                'height' => ['nullable', 'integer', 'max:2000'],
                'quality' => ['nullable', 'integer', 'min:0', 'max:100'],
                'type' => ['nullable', 'in:jpg,png,gif,tif,bmp,ico,psd,webp,data-url'],
                'width' => ['nullable', 'integer', 'max:2000'],
            ]);
        } catch (ValidationException $th) {
            return $this->failureResponse($th->getMessage(), 400);
        }

        return $this->imageService->get($image, $options);
    }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(Image $image): Response
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, Image $image): RedirectResponse
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image): RedirectResponse
    {
        if ($this->imageService->delete($image)) {
            $this->setFlashSuccess('Image deleted successfully');
        } else {
            $this->setFlashError('Failed to delete the image');
        }

        return back();
    }
}
