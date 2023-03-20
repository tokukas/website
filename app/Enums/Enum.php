<?php

namespace App\Enums;

/**
 * The enum base class.
 *
 * It is recommended to make enum keys and values unique and the keys to be
 * UPPERCASE.
 *
 * For example :
 * ```php
 * class Roles extends Enum
 * {
 *     const DEFAULT = null;
 *     const ADMIN = 'admin';
 *     const EMPLOYEE = 'employee';
 * }
 * ```
 *
 * Other example :
 *
 * ```php
 * class Levels extends Enum
 * {
 *     const BEGINNER = 0;
 *     const INTERMEDIATE = 1;
 *     const EXPERT = 2;
 * }
 * ```
 */
class Enum
{
    /**
     * Get all keys and values of this enum.
     *
     * @return array<string, mixed> An associative array of enums.
     */
    public static function all(): array
    {
        return (new \ReflectionClass(static::class))->getConstants();
    }

    /**
     * Get all values of this enum.
     *
     * @return (string|int|float|bool|null)[] An indexed array of enum values.
     */
    public static function values(): array
    {
        return array_values(static::all());
    }

    /**
     * Get all keys of this enum.
     *
     * @return string[] An indexed array of enum keys.
     */
    public static function keys(): array
    {
        return array_keys(static::all());
    }

    /**
     * Get the first enum key of the given value.
     *
     * @param  string|int|float|bool|null  $value The enum value.
     * @return string|null `null` if the key of given value is not exists.
     */
    public static function key(string|int|float|bool|null $value): ?string
    {
        return array_search($value, static::all(), true) ?: null;
    }

    /**
     * Check if the given key is exists in this enum.
     *
     * @param  string  $key The enum key.
     */
    public static function hasKey(string $key): bool
    {
        return in_array($key, static::keys(), true);
    }

    /**
     * Check if the given value is exists in this enum.
     *
     * @param  string|int|float|bool|null  $value The enum value.
     */
    public static function hasValue(string|int|float|bool|null $value): bool
    {
        return in_array($value, static::values(), true);
    }

    /**
     * Get all keys and values of this enum as an object
     *
     * @return object An object of enums.
     */
    public static function asObject(): object
    {
        return (object) static::all();
    }
}
