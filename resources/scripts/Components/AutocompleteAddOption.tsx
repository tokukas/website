import { RequiredFor } from '@/Utils/Types';
import Autocomplete, {
  AutocompleteProps, createFilterOptions,
} from '@mui/material/Autocomplete';
import { CreateFilterOptionsConfig } from '@mui/material/useAutocomplete';
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

export type TPropsAutocompleteAddOption<
  O extends Record<string, unknown>,
  L extends keyof O,
  Multiple extends boolean | undefined = false,
> = RequiredFor<
  FreeSoloAutocompleteProps<TOption<O, L>, Multiple>, 'value'
> & {
  /**
   * Determine which prop that used as the data.
   *
   * @default labelKey - Same as `labelKey` value.
   */
  dataKey?: keyof O;
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
  onSelectAddOption: () => void;
  /**
   * Handle action to set the data.
   *
   * @param key Equals to `dataKey` (or `labelKey`)
   * @param value The data value.
   */
  setData: <K extends keyof O | L>(key: K, value: O[K]) => void;
  /**
   * Handle action to set the value.
   */
  setValue: <Option extends TOption<O, L>>(value: Option | null) => void;
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
  Multiple extends boolean | undefined = false,
>({
  dataKey,
  filterConfig,
  labelKey,
  onSelectAddOption,
  options,
  setData,
  setValue,
  renderOption,
  value,
  ...otherProps
}: TPropsAutocompleteAddOption<T, K, Multiple>) {
  type Option = TOption<T, K>;

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

  const handleOnChangeValueString = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string,
  ) => {
    const option = options.find((opt) => matchOptionWithInput(opt, newValue));

    if (option) {
      event.preventDefault();
      setValue(option);
      setData(usedDataKey, option[usedDataKey]);
    } else {
      setValue({ [labelKey]: newValue } as Option);
      onSelectAddOption();
    }
  };

  const handleOnChangeValueObject = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: Option,
  ) => {
    if (newValue.inputValue) {
      setValue({ [labelKey]: newValue.inputValue } as Option);
      onSelectAddOption();
    } else {
      setValue(newValue);
      setData(usedDataKey, newValue[usedDataKey]);
    }
  };

  return (
    <Autocomplete
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      freeSolo
      clearOnBlur
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
      onChange={(event, newValue) => {
        if (Array.isArray(newValue)) {
          // When the `Multiple` is `true`, `newValue` will be an array.
          // TODO: handle this
        } else if (typeof newValue === 'string') {
          // If value selected with enter, `newValue` will be a string.
          handleOnChangeValueString(event, newValue);
        } else if (!newValue) {
          // When the value is cleared, `newValue` will be `null`.
          setValue(null);
          setData(usedDataKey, '' as T[keyof T]);
        } else {
          // If value is selected for option, `newValue` will be an object.
          handleOnChangeValueObject(event, newValue as Option);
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
