<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'book_id' => fake()->randomElement(\App\Models\Book::pluck('id')->toArray()),
            'sku' => fake()->unique()->ean13(),
            'name' => fake()->words(fake()->numberBetween(2, 5), true),
            'stock' => fake()->numberBetween(0, 100),
            'price' => fake()->numberBetween(100, 10000),
            'description' => fake()->optional()->paragraph(fake()->numberBetween(0, 2)),
        ];
    }
}
