<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
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
        return [
            'title' => ['required', 'string', 'max:255'],
            'publisher_id' => ['nullable', 'string', 'exists:publishers,id'],
            'year_published' => ['required', 'integer', 'min:1900', 'max:'.date('Y')],
            'language_code' => ['required', 'string', 'size:2'],
            'width' => ['required', 'numeric', 'min:0'],
            'height' => ['required', 'numeric', 'min:0'],
            'weight' => ['required', 'numeric', 'min:0'],
            'num_of_pages' => ['required', 'integer', 'min:0'],
            'category_id' => ['nullable', 'string', 'exists:categories,id'],
            'isbn' => ['nullable', 'string', 'size:13', 'unique:App\Models\Book,isbn'],
            'description' => ['nullable', 'string', 'max:255'],
            'author_ids' => ['nullable', 'array'],
            'author_ids.*' => ['required', 'string', 'exists:App\Models\Author,id'],
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'title' => 'title',
            'publisher_id' => 'publisher',
            'year_published' => 'year published',
            'language_code' => 'language',
            'width' => 'width',
            'height' => 'height',
            'weight' => 'weight',
            'num_of_pages' => 'number of pages',
            'category_id' => 'category',
            'isbn' => 'ISBN',
            'description' => 'description',
            'author_ids' => 'authors',
        ];
    }
}
