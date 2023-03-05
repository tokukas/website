import { RequiredFor } from '@/Utils/Types';
import Autocomplete, {
  AutocompleteProps, createFilterOptions,
} from '@mui/material/Autocomplete';
import {
  AutocompleteValue, CreateFilterOptionsConfig,
} from '@mui/material/useAutocomplete';
import React from 'react';

/**
 * The type of Autocomplete option.
 * - `Option` is a object properties for the Option.
 * - `Label` is a key that used as labelKey.
 */
export type TOption<
  Option extends Record<string, unknown>,
  Label extends keyof Option,
> = Option & {
  [key in Label]: string;
} & {
  inputValue?: string;
};

export type FreeSoloAutocompleteProps<
  T, Multiple extends boolean | undefined = false
> = Omit<AutocompleteProps<T, Multiple, false, true>,
  'freeSolo' | 'disableClearable' | 'clearOnBlur'
  | 'getOptionLabel' | 'filterOptions' | 'onChange'
>;

type FreeSoloAutocompleteValue<
  T, Multiple extends boolean | undefined = false
> = AutocompleteValue<T, Multiple, false, true>;

type FreeSoloAutocompleteData<
  T,
  K extends keyof T,
  Multiple extends boolean | undefined = false
> = Multiple extends true ? Array<T[K]> : T[K];

export type TPropsAutocompleteAddOption<
  O extends Record<string, unknown>,
  L extends keyof O,
  DataKey extends keyof O = L,
  Multiple extends boolean | undefined = false,
> = RequiredFor<
  FreeSoloAutocompleteProps<TOption<O, L>, Multiple>, 'value'
> & {
  /**
   * Determine which prop that used as the data.
   */
  dataKey?: DataKey;
  /**
   * The config to filter the options.
   *
   * The default values is follows the values defined in the [docs](https://mui.com/material-ui/react-autocomplete/#custom-filter),
   * except for `config.trim` is changed to `true`.
   *
   * @default
   * ```
   * {
   *   ignoreAccents: true,
   *   ignoreCase: true,
   *   limit: null,
   *   matchFrom: 'any',
   *   trim: true,
   * }
   * ```
   */
  filterConfig?: CreateFilterOptionsConfig<TOption<O, L>>;
  /**
   * Determine which prop that used as the label.
   */
  labelKey: L;
  /**
   * Handle action when Add Option is selected.
   */
  onSelectAddOption: (inputValue: string) => void;
  /**
   * Handle action to set the data.
   */
  setData: (
    data: FreeSoloAutocompleteData<TOption<O, L>, DataKey | L, Multiple>
  ) => void;
  /**
   * Handle action to set the value.
   */
  setValue: (value: FreeSoloAutocompleteValue<
    TOption<O, L>, Multiple>) => void;
};

/**
 * Custom Autocomplete Component with Add Option.
 *
 * This component will provide an additional option when the user
 * input is not found in the options. This additional option will
 * trigger the `onSelectAddOption` handler. If user doesn't select
 * any options, the input will be cleared.
 *
 * Based on:
 * - [MUI Docs](https://mui.com/material-ui/react-autocomplete/#creatable)
 * - [`FreeSoloCreateOptionDialog` in MUI GitHub](https://github.com/mui/material-ui/blob/v5.11.11/docs/data/material/components/autocomplete/FreeSoloCreateOptionDialog.tsx)
 */
export default function AutocompleteAddOption<
  T extends Record<string, unknown>,
  K extends keyof T,
  DataKey extends keyof T = K,
  Multiple extends boolean | undefined = false,
>({
  dataKey,
  filterConfig,
  labelKey,
  multiple,
  onSelectAddOption,
  options,
  setData,
  setValue,
  renderOption,
  value,
  ...otherProps
}: TPropsAutocompleteAddOption<T, K, DataKey, Multiple>) {
  type Option = TOption<T, K>;
  type Value = FreeSoloAutocompleteValue<Option, Multiple>;
  type Data = FreeSoloAutocompleteData<Option, DataKey | K, Multiple>;

  const usedDataKey = dataKey ?? labelKey;

  const filterOptions = createFilterOptions(filterConfig);

  const matchOptionWithInput = (option: Option, input: string) => {
    let o: string = option[labelKey];
    let i: string = input;

    if (filterConfig?.trim ?? true) {
      o = o.trim();
      i = i.trim();
    }

    if (filterConfig?.ignoreCase ?? true) {
      o = o.toLowerCase();
      i = i.toLowerCase();
    }

    return o === i;
  };

  return (
    <Autocomplete
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      freeSolo
      clearOnBlur
      multiple={multiple}
      value={value}
      options={options}
      getOptionLabel={(option) => (typeof option === 'string'
        ? option
        : option.inputValue ?? option[labelKey]
      )}
      filterOptions={(opts, state) => {
        const filtered = filterOptions(opts, state);
        const findOption = opts.find((opt) => (
          matchOptionWithInput(opt, state.inputValue)
        ));

        if (state.inputValue && !findOption) {
          filtered.push({
            [labelKey]: `Add "${state.inputValue}"`,
            inputValue: state.inputValue,
          } as Option);
        }

        return filtered;
      }}
      renderOption={renderOption ?? ((props, option) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <li {...props}>{option[labelKey]}</li>
      ))}
      onChange={(event, newValue, reason, details) => {
        if (reason === 'clear') {
          setValue(multiple
            ? [] as unknown as Value
            : null as Value);
          setData(multiple
            ? [] as unknown as Data
            : undefined as unknown as Data);
          return;
        }

        // Only if Multiple extends true.
        if (reason === 'removeOption') {
          setValue(newValue);

          setData((newValue as Option[]).map((opt) => (
            opt[usedDataKey as keyof T]
          )).filter((data) => (
            data !== details?.option[usedDataKey as keyof T]
          )) as Data);

          return;
        }

        if (reason === 'createOption') {
          // In create option, details?.option always be a string.
          const option = options.find((opt) => (
            matchOptionWithInput(opt, details?.option as unknown as string)
          ));

          if (option) {
            event.preventDefault();

            if (multiple) {
              const newValues = newValue as Option[];
              newValues.pop();
              newValues.push(option);

              setValue(newValues as Value);

              setData(newValues.map((opt) => (
                opt[usedDataKey as keyof T]
              )) as Data);

              return;
            }

            setValue(option as Value);
            setData(option[usedDataKey] as Data);
            return;
          }

          onSelectAddOption(details?.option as unknown as string);
          return;
        }

        if (reason === 'selectOption') {
          if (details?.option.inputValue) {
            onSelectAddOption(details?.option.inputValue);
            return;
          }

          setValue(newValue);

          if (multiple) {
            setData((newValue as Option[]).map((opt) => (
              opt[usedDataKey as keyof T]
            )) as Data);
          } else {
            setData((newValue as Option)[usedDataKey] as Data);
          }
        }
      }}
    />
  );
}

AutocompleteAddOption.defaultProps = {
  dataKey: undefined,
  filterConfig: {
    ignoreAccents: true,
    ignoreCase: true,
    limit: null,
    matchFrom: 'any',
    trim: true,
  },
};
