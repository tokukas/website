<?php

namespace App\Imports\AddBulk;

use App\Http\Requests\StorePublisherRequest;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Publisher;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class BooksSheet implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        // Skip description rows.
        $rows = $rows->skip(2);
        $this->validateRows($rows);

        foreach ($rows as $row) {
            $books = Book::create([
                'title' => $row['title'],
                'publisher_id' => $row['publisher_id'],
                'year_published' => $row['year_published'],
                'language_code' => $row['language_code'],
                'width' => $row['width'],
                'height' => $row['height'],
                'weight' => $row['weight'],
                'num_of_pages' => $row['num_of_pages'],
                'category_id' => $row['category_id'],
                'isbn' => $row['isbn'],
                'description' => $row['description'],
            ]);

            $books->authors()->sync($row['authors']);
        }
    }

    /**
     * @return array The validated data.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function validateRows(Collection $rows): array
    {
        logger('originalRows', [$rows]);
        $rows = $this->prepareForValidation($rows);
        logger('preparedRows', [$rows]);

        $rules = [
            '*.title' => ['required', 'string', 'max:255'],
            '*.publisher_id' => ['nullable', 'string', 'exists:publishers,id'],
            '*.year_published' => ['required', 'integer', 'min:1900', 'max:' . date('Y')],
            '*.language_code' => ['required', 'string', 'size:2'],
            '*.width' => ['required', 'numeric', 'min:0'],
            '*.height' => ['required', 'numeric', 'min:0'],
            '*.weight' => ['required', 'numeric', 'min:0'],
            '*.num_of_pages' => ['required', 'integer', 'min:0'],
            '*.category_id' => ['nullable', 'string', 'exists:categories,id'],
            '*.isbn' => ['nullable', 'alpha-dash', 'max:17', 'unique:App\Models\Book,isbn'],
            '*.description' => ['nullable', 'string', 'max:255'],
            '*.authors' => ['nullable', 'array'],
            '*.authors.*' => ['required', 'string', 'exists:App\Models\Author,id'],
        ];

        $validator = Validator::make($rows->toArray(), $rules);

        return $validator->validate();
    }

    protected function prepareForValidation(Collection $rows): Collection
    {
        foreach ($rows as $row) {
            $authors = [];

            // Assumed id
            if ($row['publisher_id'] && !Publisher::find($row['publisher_id'])) {
                // Assumed name
                $publisher = Publisher::where('slug', str()->slug($row['publisher_id']))->first();

                if (!$publisher) {
                    // Add new publisher
                    $publisher = Publisher::create([
                        'name' => $row['publisher_id'],
                        'slug' => str()->slug($row['publisher_id']),
                    ]);
                }

                $row['publisher_id'] = $publisher->id;
            }

            if ($row['category_id'] && ! Category::find($row['category_id'])) {
                // Assumed name
                $categoryName = str($row['category_id'])->lower()->snake()->toString();
                $category = Category::where('name', $categoryName)->first();

                if (!$category) {
                    // Add new category
                    $category = Category::create([
                        'name' => $categoryName,
                    ]);
                }

                $row['category_id'] = $category->id;
            }

            // Handle author ids that separated with ;
            if ($row['authors']) {
                $authorIds = explode(';', $row['authors']);
                $authorIds = array_map('trim', $authorIds);
                $authorIds = array_filter($authorIds);

                foreach ($authorIds as $authorId) {
                    if (!Author::find($authorId)) {
                        // Assumed name
                        $authorName = str()->upper($authorId);
                        $author = Author::where('name', $authorName)->first();

                        if (!$author) {
                            // Add new author
                            $author = Author::create([
                                'name' => $authorName,
                            ]);
                        }

                        $authorId = $author->id;
                    }

                    $authors[] = $authorId;
                }

                $row['authors'] = $authors;
            }
        }

        return $rows;
    }
}
