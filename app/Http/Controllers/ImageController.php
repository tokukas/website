<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Traits\ApiResponser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ImageController extends Controller
{
    use ApiResponser;

    public function __construct()
    {
        $this->middleware(['auth', 'verified'])->except(['show']);
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
        try {
            $request->validate([
                'height' => ['nullable', 'integer'],
                'quality' => ['nullable', 'integer'],
                'type' => ['nullable', 'in:jpg,png,gif,tif,bmp,ico,psd,webp,data-url'],
                'width' => ['nullable', 'integer'],
            ]);
        } catch (ValidationException $th) {
            return $this->failureResponse($th->getMessage(), 400);
        }

        $img = \Intervention\Image\Facades\Image::make(
            Storage::get($image->path)
        );

        if ($request->has('width')) {
            $img->widen($request->width);
        }

        if ($request->has('height')) {
            $img->heighten($request->height);
        }

        if ($request->has('width') && $request->has('height')) {
            $img->resize($request->width, $request->height);
        }

        return $img->response(
            $request->type ?? null,
            $request->quality ?? 90,
        );
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
        if (
            $image->delete()
            && Storage::delete($image->path)
        ) {
            $this->setFlashSuccess('Image deleted successfully');
        } else {
            $this->setFlashError('Failed to delete the image');
        }

        return back();
    }
}
