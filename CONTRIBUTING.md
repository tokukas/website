<h1>Contributing to Tokukas Website</h1>

Welcome to the Tokukas website repository on GitHub. Here you can browse the source, look at open issues and keep track of development. If you are interested in contributing to Tokukas website, please read the following contribution guide.

---

<h2>Table of Contents</h2>

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Without Docker](#without-docker)
    - [With Docker (Laravel Sail)](#with-docker-laravel-sail)
- [Code of Conduct](#code-of-conduct)
- [Style Guide](#style-guide)
  - [Commit Message](#commit-message)
  - [JavaScript and TypeScript Style Guide](#javascript-and-typescript-style-guide)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)

---

## Getting Started

### Prerequisites

- [PHP 8.0](https://www.php.net/downloads.php)
- [Composer](https://getcomposer.org/download)
- [Node.js](https://nodejs.org/en/download)
- [NPM](https://www.npmjs.com/get-npm)
- [MySQL](https://www.mysql.com/downloads)

### Installation

#### Without Docker

1. Clone this repository.
2. Install the dependencies. Run `composer install` command, then run `npm install` command.
3. Create `.env` file by simply copying the `.env.example` file and rename it.
4. Make sure you have a database created and the database server is running.
5. Configure the `.env` file with your **database connection**, **seeder configuration**, etc.
6. Generate the application key with `php artisan key:generate` command.
7. Generate the database structure with this commands based on your preferences:
    - Use **`php artisan migrate`** for [creating / updating the database](https://laravel.com/docs/9.x/migrations).
    - Use **`php artisan db:seed`** for [seeding the database](https://laravel.com/docs/9.x/seeding#running-seeders).
    - Use `php artisan migrate:fresh` for fresh installation.
    - Use `php artisan migrate:fresh --seed` for fresh installation and seeding the database.

> **!!! Warning !!!**
>
> If you use `php artisan migrate:fresh` command, all tables will be dropped and recreated. **All data in the tables will be lost**.

8. Start the application with `php artisan serve` command.
9. Finally, compile the app resources with [Vite](https://vitejs.dev) using **`npm run dev`** command.

> In **production**, use `npm run build` command.

#### With Docker (Laravel Sail)

1. Clone this repository, and go to the application's directory.

2. [Install the application's dependencies](https://laravel.com/docs/9.x/sail#installing-composer-dependencies-for-existing-projects) by executing the following command:
    ```bash
    docker run --rm \
       -u "$(id -u):$(id -g)" \
       -v "$(pwd):/var/www/html" \
       -w /var/www/html \
       laravelsail/php81-composer:latest \
       composer install --ignore-platform-reqs
    ```

3. Create `.env` file by simply copying the `.env.example` file and rename it.

4. Configure the `.env` file to modify:
    - the **app configuration** (`APP_NAME`, `APP_PORT`, etc),
    - the **database connection** (`DB_PORT`, `DB_DATABASE`, etc),
    - the **seeder configuration** (`SEEDER_TESTER_NAME`, etc),
    - etc.

    > See [docker-compose.yml](./docker-compose.yml) file to find out what environment variables are used by docker.

5. Start the app:
    ```bash
    ./vendor/bin/sail up -d
    ```

    > To **stop the app**, use `./vendor/bin/sail down` command.

6. Enter to app bash:
    ```bash
    ./vendor/bin/sail bash
    ```

7. Install the front-end dependencies with `npm install` command.
8. Generate the application key with `php artisan key:generate` command.
9. Generate the database structure with this commands based on your preferences:
    - Use **`php artisan migrate`** for [creating / updating the database](https://laravel.com/docs/9.x/migrations).
    - Use **`php artisan db:seed`** for [seeding the database](https://laravel.com/docs/9.x/seeding#running-seeders).
    - Use `php artisan migrate:fresh` for fresh installation.
    - Use `php artisan migrate:fresh --seed` for fresh installation and seeding the database.

    > **!!! Warning !!!**
    >
    > If you use `php artisan migrate:fresh` command, all tables will be dropped and recreated. **All data in the tables will be lost**.

10. Finally, compile the app resources with [Vite](https://vitejs.dev) using **`npm run dev`** command.

    > In **production**, use `npm run build` command

## Code of Conduct

This project and everyone participating in it is governed by the [Tokukas Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Style Guide

### Commit Message

All commit messages SHOULD adhere the [**Conventional Commits specification**](https://www.conventionalcommits.org/en/v1.0.0/).

-   Use the present tense ("Add feature" not "Added feature").
-   Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
-   Limit the first line to 72 characters or less.
-   Reference issues and pull requests liberally after the first line.
-   Use semantic commit messages like:
    -   `feat`: A new feature.
    -   `fix`: A bug fix.
    -   `docs`: Documentation only changes.
    -   `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
    -   `refactor`: A code change that neither fixes a bug nor adds a feature. For example, renaming a variable, moving a function, etc.
    -   `perf`: A code change that improves performance.
    -   `test`: Adding missing tests or correcting existing tests.
    -   `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
    -   `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).
    -   `chore`: Other changes that don't modify src or test files. For example, updating build tasks, package manager configs, etc.
    -   `revert`: Reverts a previous commit.
-   Use the body to explain what and why vs. how. In most cases, you can leave out details about how a change has been made.

### JavaScript and TypeScript Style Guide

All JavaScript and TypeScript code must adhere to [**Airbnb JavaScript Style Guide**](https://airbnb.io/javascript) with some exceptions and modifications that can be found in the `rules` section of the [`.eslintrc.json`](.eslintrc.json) file.

> **Recommendation**
>
> If you are using Visual Studio Code, you can install the [**ESLint extension**](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to get real-time linting feedback as you code and give you the ability to automatically fix the linting errors.

## How to Contribute

### Reporting Bugs

If you find a bug, please report it to us by [opening an issue](https://github.com/tokukas/website/issues/new/choose) and select the `Bug Report` template.

### Suggesting Enhancements

If you have an idea for an enhancement, please [open an issue](https://github.com/tokukas/website/issues/new/choose) and select the `Feature Request` template.

### Pull Requests

If you want to contribute code, follow these steps:

1. Fork the repository.
2. Create a new branch from the `main` branch. The branch name should be in the format like [Commit Message](#commit-message), but replace the `:` with `/` (e.g. `feat/feature-name`).
3. Make your changes.
4. Commit your changes. The commit message must follow the [Commit Message](#commit-message) format.
5. Push your changes to your fork.
6. [Open a pull request](https://github.com/tokukas/website/issues/new/choose) to the `main` branch and select the `Pull Request` template.
7. Wait for the review.

> **Note:** Please make sure that your code is following the [style guide](#style-guide) before creating a pull request.
