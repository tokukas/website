<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => fake()->words(fake()->numberBetween(2, 5), true),
            'publisher_id' => fake()->optional(0.9)->randomElement(\App\Models\Publisher::pluck('id')->toArray()),
            'year_published' => fake()->year(),
            'language_code' => fake()->languageCode(),
            'width' => fake()->randomFloat(2, 0, 100),
            'height' => fake()->randomFloat(2, 0, 100),
            'weight' => fake()->randomFloat(2, 0, 100),
            'num_of_pages' => fake()->randomNumber(3),
            'category_id' => fake()->optional(0.9)->randomElement(\App\Models\Category::pluck('id')->toArray()),
            'isbn' => fake()->optional()->isbn13(),
            'description' => fake()->optional()->paragraph(fake()->numberBetween(0, 2)),
        ];
    }

    /**
     * Configure the model factory.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (Book $book) {
            // Add random authors for each book.
            $book->authors()->attach(
                fake()->randomElements(
                    \App\Models\Author::pluck('id')->toArray(),
                    fake()->numberBetween(0, 3),
                ),
            );
        });
    }
}
