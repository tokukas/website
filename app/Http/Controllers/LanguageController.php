<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponser;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    use ApiResponser;

    public function translate(Request $request)
    {
        try {
            $request->validate([
                'key' => ['required', 'string'],
                'replace' => ['nullable', 'array'],
            ]);
        } catch (\Throwable $th) {
            return $this->failureResponse($th->getMessage(), 400);
        }

        return $this->successResponse(
            __($request->key, $request->replace ?? [])
        );
    }
}
