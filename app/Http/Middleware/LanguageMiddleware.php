<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LanguageMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (
            session()->has('lang')
            && in_array(session('lang'), config('language.available'))
        ) {
            app()->setLocale(session('lang'));
        } else {
            app()->setLocale(config('app.locale'));
        }

        return $next($request);
    }
}
