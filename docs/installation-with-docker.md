<h1>Installation with Docker</h1>

This is the guide to install the app in your local machine with Docker.

We use [Laravel Sail](https://laravel.com/docs/9.x/sail) to help dockerize this app easily. Laravel Sail is supported on:
- macOS
- Linux
- Windows (via [WSL2](https://learn.microsoft.com/en-us/windows/wsl))

---

<h2>Table of Contents</h2>

- [Prerequisites](#prerequisites)
- [Docker Services](#docker-services)
  - [phpMyAdmin](#phpmyadmin)
- [Steps](#steps)
  - [Clone this repository](#clone-this-repository)
  - [Install the dependencies](#install-the-dependencies)
  - [Create `.env` file and configure it](#create-env-file-and-configure-it)
  - [Build and start the app](#build-and-start-the-app)
  - [Accessing the app container from Bash](#accessing-the-app-container-from-bash)
  - [Install the front-end dependencies](#install-the-front-end-dependencies)
  - [Generate the app key](#generate-the-app-key)
  - [Generate the database](#generate-the-database)
  - [Bundle the front-end resources](#bundle-the-front-end-resources)
  - [Last, open the app](#last-open-the-app)

---

## Prerequisites

To install this application with Docker, you must have Docker running on your machine.

Please go to the [Docker installation guide](https://docs.docker.com/engine/install), select your platform machine, and follow the instructions.

## Docker Services

The [docker-compose.yml](../docker-compose.yml) file is used to define the app's services, consist of:

- `laravel.test` - the app container, which is based on [Laravel Sail's PHP 8.2 image](https://hub.docker.com/r/laravelsail/php82-composer).
- `mysql` - the database container,  which is based on [MySQL 8.0 image](https://hub.docker.com/_/mysql/tags?name=8).
- `phpmyadmin` - the [phpMyAdmin](https://www.phpmyadmin.net) container to access the database from browser. Based on [phpMyAdmin latest image](https://hub.docker.com/_/phpmyadmin).

### phpMyAdmin

You can access your database from `http://localhost:8080`, and insert the username and password with the value that you set to `DB_USERNAME` and `DB_PASSWORD` in `.env` file.

Of course you can only access it after completing the entire [installation steps](#steps).

If you don't want using phpMyAdmin, you can use alternative database management app and remove the `phpmyadmin` service from [docker-compose.yml](../docker-compose.yml) file:

```yml
- services:
  # ...
  # Delete the lines below
  phpmyadmin:
    image: "phpmyadmin:latest"
    ports:
      - 8080:80
    environment:
      PMA_HOST: mysql
    networks:
      - sail
    depends_on:
      - mysql
  # End deleted line
- networks:
# ...
```

> See [Interacting with Sail Databases](https://laravel.com/docs/9.x/sail#interacting-with-sail-databases) in Laravel documentation.

## Steps

### Clone this repository

Use [`git clone`](https://www.git-scm.com/docs/git-clone) command, to clone this repository using HTTPS or SSH.

### Install the dependencies

Move to the application's directory, then execute the following command:

```bash
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php81-composer:latest \
    composer install --ignore-platform-reqs
```

This command will installing the back-end dependencies.

> See the [Installing Composer Dependencies for Existing Projects](https://laravel.com/docs/9.x/sail#installing-composer-dependencies-for-existing-projects) in Laravel documentation for details.

### Create `.env` file and configure it

Create `.env` file by simply copying the **`.env.example` file** and rename it.

In `.env` file, you may need to modify:

- the app configuration (`APP_NAME`, `APP_PORT`, etc),
- the database connection (`DB_PORT`, `DB_DATABASE`, etc),
- the seeder configuration (`SEEDER_TESTER_NAME`, etc),
- etc.

See [docker-compose.yml](../docker-compose.yml) file to find out what environment variables are used by Docker (written in string literal format like `"${VAR_NAME}"`).

> See Laravel documentation about [Databases and Migrations](https://laravel.com/docs/9.x/#databases-and-migrations) and [Environment Configuration](https://laravel.com/docs/9.x/configuration#environment-configuration) for details.

### Build and start the app

Run this command:

```bash
./vendor/bin/sail up -d
```

This command will download and install the container images that defined in [docker-compose.yml](../docker-compose.yml) if not exists, then start the app container (include the database container).

> To **stop the app**, use `./vendor/bin/sail down` command.

### Accessing the app container from Bash

After the containers run, you can access the app container from the Bash CLI using this command:

```bash
./vendor/bin/sail bash
```

Then you can execute any command directly inside the container, like `npm run dev`.

> See [Executing Commands](https://laravel.com/docs/9.x/sail#executing-sail-commands) in Laravel documentation for details.

### Install the front-end dependencies

To install the front-end dependencies, you can use `./vendor/bin/sail npm install` command to execute it from app directory.

If you have already in the [app container](#accessing-the-app-container-from-bash), you can run `npm install` directly.

> See [Executing Node / NPM Commands](https://laravel.com/docs/9.x/sail#executing-node-npm-commands) in Laravel documentation.

---

The remainder of this documentation's examples will assume that you have already in the [app container](#accessing-the-app-container-from-bash).

---

### Generate the app key

Use `php artisan key:generate` command to generate the `APP_KEY`.

### Generate the database

Generate the database with this commands based on your preferences:

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

### Last, open the app

Open your browser and go to `http://localhost:8000` (or `http://localhost:APP_PORT` if you have changed the `APP_PORT` in `.env` file).
