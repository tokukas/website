<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class OnlyForAdmins
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        abort_if(! $request->user()?->isAdmin(), 401, 'This resource is for admin only');

        return $next($request);
    }
}
