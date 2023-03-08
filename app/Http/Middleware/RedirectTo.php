<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Exception\RouteNotFoundException;

/**
 * Middleware to set the intended url to specific **route name** or **previous url** that defined in `to` request param.
 *
 * Set `to` with `"back"` to set the intended url with previous url.
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
        if ($request->has('to')) {
            $target = $request->input('to');
            $intendedUrl = null;

            try {
                $intendedUrl = route($target);
            } catch (RouteNotFoundException $th) {
                if ($target === 'back') {
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
