<h1>Contributing to Tokukas Website</h1>

Welcome to the Tokukas website repository on GitHub. Here you can browse the source, look at open issues and keep track of development. If you are interested in contributing to Tokukas website, please read the following contribution guide.

---

<h2>Table of Contents</h2>

- [Getting Started](#getting-started)
- [Code of Conduct](#code-of-conduct)
- [Style Guide](#style-guide)
  - [Commit Message](#commit-message)
  - [PHP Style Guide](#php-style-guide)
  - [JavaScript and TypeScript Style Guide](#javascript-and-typescript-style-guide)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)

---

## Getting Started

Install this app by following one of this guides:

- [Installation with Docker](docs/installation-with-docker.md)
- [Installation without Docker](docs/installation-without-docker.md)

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

### PHP Style Guide

All PHP code must adhere to [default Laravel Pint preset](https://laravel.com/docs/pint#presets) ([see the rules here](https://github.com/laravel/pint/blob/main/resources/presets/laravel.php)) with some exceptions and modifications that can be found in the `rules` section of the [`pint.json`](pint.json) file.

You can run [Laravel Pint](https://laravel.com/docs/pint) to auto-fix the code styling:

```bash
./vendor/bin/pint

# Run in Sail
./vendor/bin/sail pint
```

> !!! Make sure your code **doesn't have any code styling error** before commit !!!

Test your code with `--test` option:

```bash
./vendor/bin/pint --test

# Run in Sail
./vendor/bin/sail pint --test
```

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
