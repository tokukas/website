<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('title');
            $table->ulid('publisher_id')->nullable();
            $table->foreign('publisher_id')->references('id')->on('publishers')->cascadeOnUpdate()->nullOnDelete();
            $table->year('year_published');
            $table->char('language_code', 2);
            $table->float('width');
            $table->float('height');
            $table->float('weight');
            $table->integer('num_of_pages');
            $table->ulid('category_id')->nullable();
            $table->foreign('category_id')->references('id')->on('categories')->cascadeOnUpdate()->nullOnDelete();
            $table->string('isbn', 17)->unique()->nullable();
            $table->string('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
};
