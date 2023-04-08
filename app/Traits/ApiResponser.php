<?php

namespace App\Traits;

/**
 * ----------------------------------------------
 * Api Responser Trait
 * ----------------------------------------------
 *
 * This trait will be used for any response we sent to clients.
 */
trait ApiResponser
{
    /**
     * Return a success JSON response.
     *
     * @param  array|string|null  $data The data to return.
     * @param  string  $message The message about the response.
     * @param  int  $code The HTTP status code.
     * @return \Illuminate\Http\JsonResponse The response.
     */
    protected function successResponse($data = null, string $message = 'OK', int $code = 200)
    {
        return response()->json([
            'status' => 'success',
            'status_code' => $code,
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    /**
     * Return a failure JSON response.
     *
     * @param  string|array  $message The message about the response or the errors.
     * @param  int  $code The HTTP status code.
     * @return \Illuminate\Http\JsonResponse The response.
     */
    protected function failureResponse($message = 'Internal Server Error', int $code = 500)
    {
        return response()->json([
            'status' => 'fail',
            'status_code' => $code,
            'message' => $message,
        ], $code);
    }
}
