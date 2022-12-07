<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Create Roles if not exists.
        if (\App\Models\Role::count() === 0) {
            $this->seedRoles();
        }

        $theTester = \App\Models\User::firstWhere('email', config('seeder.tester_email'));

        // Create The Tester if not exists.
        if (empty($theTester)) {
            $theTester = $this->createTester();
        }

        // Seed the publishers.
        $this->seedPublishers();
    }

    /**
     * Create an user as "The Tester".
     */
    private function createTester()
    {
        return \App\Models\User::factory()->create([
            'name' => config('seeder.tester_name'),
            'email' => config('seeder.tester_email'),
            'password' => Hash::make(config('seeder.tester_password')),
            'email_verified_at' => now(),
            'role' => config('seeder.tester_is_admin') ? 'admin' : null,
        ]);
    }

    /**
     * Seed the roles.
     */
    private function seedRoles()
    {
        \App\Models\Role::factory()->createMany([
            ['key' => 'admin', 'name' => 'Administrator'],
        ]);
    }

    /**
     * Seed the publishers.
     */
    private function seedPublishers()
    {
        $this->call(PublisherSeeder::class);
    }
}
