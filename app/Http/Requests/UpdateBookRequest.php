<?php

namespace App\Http\Requests;

class UpdateBookRequest extends StoreBookRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return request()->user()?->isAdmin() ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return array_merge(parent::rules(), [
            'isbn' => ['nullable', 'alpha-dash', 'max:17', 'unique:App\Models\Book,isbn,'.request()->route('book')->id],
        ]);
    }
}
