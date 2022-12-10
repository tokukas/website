<h1>Installation without Docker</h1>

This is the guide to install the app in your local machine without docker.

---

<h2>Table of Contents</h2>

- [Prerequisites](#prerequisites)
- [Steps](#steps)
  - [Clone this repository](#clone-this-repository)
  - [Install the dependencies](#install-the-dependencies)
  - [Create `.env` file and configure](#create-env-file-and-configure)
    - [Generate the app key](#generate-the-app-key)
    - [Configure the `.env` variables](#configure-the-env-variables)
  - [Generate the database tables](#generate-the-database-tables)
  - [Bundle the front-end resources](#bundle-the-front-end-resources)
  - [Start the app](#start-the-app)

---

## Prerequisites

You need to install this requirement in your local machine:

- [PHP 8.0](https://www.php.net/downloads.php)
- [Composer](https://getcomposer.org/download)
- [Node.js](https://nodejs.org/en/download)
- [NPM](https://www.npmjs.com/get-npm)
- [MySQL](https://www.mysql.com/downloads)

> If you want to install in Windows machine, you can use [XAMPP](https://www.apachefriends.org/download.html) that contains PHP, [MariaDB (MySQL successor)](https://mariadb.com/database-topics/mariadb-vs-mysql), and phpMyAdmin.

## Steps

### Clone this repository

Use [`git clone`](https://www.git-scm.com/docs/git-clone) command, to clone this repository using HTTPS or SSH.

### Install the dependencies

Run `composer install` command to download the laravel and other back-end dependencies.

Then, run `npm install` command to download the front-end dependencies.

### Create `.env` file and configure

Create `.env` file by simply copying the **`.env.example` file** and rename it.

#### Generate the app key

Use `php artisan key:generate` command to generate the `APP_KEY`.

#### Configure the `.env` variables

In `.env` file, you may need to modify:

- the app configuration (`APP_NAME`, `APP_PORT`, etc),
- the database connection (`DB_PORT`, `DB_DATABASE`, etc),
- the seeder configuration (`SEEDER_TESTER_NAME`, etc),
- etc.

> See Laravel documentation about [databases and migrations](https://laravel.com/docs/9.x/#databases-and-migrations) and [environment configuration](https://laravel.com/docs/9.x/configuration#environment-configuration) for details.

### Generate the database tables

Make sure you have a database created, the database server is running, and you have configured the database connection in `.env` correctly.

Then, generate the database structure with this commands based on your preferences:

- Use **`php artisan migrate`** for [creating / updating the database](https://laravel.com/docs/9.x/migrations).
- Use **`php artisan db:seed`** for [seeding the database](https://laravel.com/docs/9.x/seeding#running-seeders).
- Use `php artisan migrate:fresh` for fresh installation.
- Use `php artisan migrate:fresh --seed` for fresh installation and seeding the database.

> **!!! Warning !!!**
>
> If you use `php artisan migrate:fresh` command, all tables will be dropped and recreated. **All data in the tables will be lost**.

### Bundle the front-end resources

Use `npm run dev` command to start [Vite](https://vitejs.dev) bundling your resources.

> See [Laravel documentation](https://laravel.com/docs/9.x/vite) about Vite.

### Start the app

Finally, start the application using `php artisan serve` command.

> In **production**, use `npm run build` command.
