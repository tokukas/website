<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangeLanguageRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    /**
     * Go to language settings page
     */
    public function language(Request $request)
    {
        return Inertia::render('Settings/Language', [
            'languages' => config('language.available'),
        ]);
    }

    public function setLanguage(Request $request)
    {
        session()->put('lang', $request->language);

        return redirect()->back();
    }
}
