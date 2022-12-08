<?php

namespace Database\Factories;

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
}
