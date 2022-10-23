<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Tester Seeder
    |--------------------------------------------------------------------------
    |
    | This value will be used to seed "The Tester".
    |
    */

    // The Tester's name
    'tester_name' => env('SEEDER_TESTER_NAME', 'Tester'),

    // The Tester's email
    'tester_email' => env('SEEDER_TESTER_EMAIL'),

    // The Tester's password
    'tester_password' => env('SEEDER_TESTER_PASSWORD'),

    // Indicate The Tester is an admin or not
    'tester_is_admin' => env('SEEDER_TESTER_IS_ADMIN', false),
];
