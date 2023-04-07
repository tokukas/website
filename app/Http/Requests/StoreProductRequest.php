<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'book_id' => ['required', 'exists:\App\Models\Book,id'],
            'name' => ['required', 'string', 'max:70'],
            'sku' => ['required', 'string', 'max:22', 'unique:\App\Models\Product,sku'],
            'photos' => ['required', 'array', 'max:5'],
            'photos.*' => ['required', 'image', 'max:5120'],
            'stock' => ['required', 'integer', 'min:0'],
            'price' => ['required', 'numeric', 'min:0'],
            'description' => ['nullable', 'string'],
            'link_shopee' => ['nullable', 'active_url'],
            'link_tokopedia' => ['nullable', 'active_url'],
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'sku' => str()->upper($this->sku),
        ]);
    }

    /**
     * Get custom attributes for validator errors.
     */
    public function attributes(): array
    {
        return [
            'book_id' => __('validation.attributes.book'),
            'photos' => __('validation.attributes.photo'),
            'photos.*' => __('validation.attributes.photo'),
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'book_id.exists' => __('The selected book is not exists.'),
            'link_shopee.active_url' => __('The given :platform link is not a valid URL.', ['platform' => 'Shopee']),
            'link_tokopedia.active_url' => __('The given :platform link is not a valid URL.', ['platform' => 'Tokopedia']),
        ];
    }
}
