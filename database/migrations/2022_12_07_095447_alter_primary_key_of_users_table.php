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
        Schema::table('users', function (Blueprint $table) {
            // Drop primary key index if exist
            $table->dropPrimary('users_id_primary');

            // Add new id column with ulid
            $table->ulid('id')->primary()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Revert the ulid id column
            $table->dropPrimary('users_id_primary');
            $table->dropColumn('id');
        });
    }
};
