<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

/**
 * Middleware to set the intended url to specific **route name** or **specific url** that defined in `to` request param.
 *
 * Set `to` with `"back"` to set the intended url with **previous url**.
 *
 * If `to` is present but the value is invalid, the intended url will not be set.
 */
class RedirectTo
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($target = $request->input('to')) {
            $intendedUrl = null;

            try {
                // Ensure the target is a registered route.
                Route::getRoutes()->match(request()->create($target));
                $intendedUrl = $target;
            } catch (\Throwable $th) {
                if (Route::has($target)) {
                    $intendedUrl = route($target);
                } elseif ($target === 'back') {
                    $intendedUrl = url()->previous();
                }
            }

            if ($intendedUrl) {
                redirect()->setIntendedUrl($intendedUrl);
            }
        }

        return $next($request);
    }
}
