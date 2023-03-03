import { RequiredFor } from '@/Utils/Types';
import Autocomplete, {
  AutocompleteProps, createFilterOptions,
} from '@mui/material/Autocomplete';
import { CreateFilterOptionsConfig } from '@mui/material/useAutocomplete';
import React from 'react';

export type TOption = Record<string, string> & {
  inputValue?: string;
};

export type AutocompleteAddOptionBaseProps<Option extends TOption> = {
  /**
   * Determine which prop that used as the data.
   *
   * @default labelKey - Same as `labelKey` value.
   */
  dataKey?: keyof Omit<Option, 'inputValue'>;
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
  filterConfig?: CreateFilterOptionsConfig<Option>;
  /**
   * Determine which prop that used as the label.
   */
  labelKey: keyof Omit<Option, 'inputValue'>;
  /**
   * Handle action when Add Option is selected.
   */
  onSelectAddOption: () => void;
  /**
   * Handle action to set the data.
   */
  setData: (key: keyof Option, value: Option[keyof Option]) => void;
  /**
   * Handle action to set the value.
   */
  setValue: (value: Option | null) => void;
};

export type FreeSoloAutocompleteProps<T> = Omit<
  AutocompleteProps<T, false, false, true>,
  'freeSolo' | 'multiple' | 'disableClearable' | 'clearOnBlur'
>;

export type TPropsAutocompleteAddOption<
  Option extends TOption
> = AutocompleteAddOptionBaseProps<Option> & RequiredFor<
  FreeSoloAutocompleteProps<Option>,
  'renderInput' | 'value'
>;

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
export default function AutocompleteAddOption<Option extends TOption>({
  dataKey,
  filterConfig,
  labelKey,
  onSelectAddOption,
  options,
  setData,
  setValue,
  value,
  ...otherProps
}: TPropsAutocompleteAddOption<Option>) {
  const usedDataKey = dataKey ?? labelKey;

  const filterOptions = createFilterOptions<Option>(filterConfig);

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
      renderOption={(props, option) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <li {...props}>{option[labelKey]}</li>
      )}
      onChange={(event, newValue) => {
        // e.g value selected with enter, right from the input
        if (typeof newValue === 'string') {
          const option = options.find((opt) => (
            matchOptionWithInput(opt, newValue)
          ));

          if (option) {
            event.preventDefault();
            setValue(option);
            setData(usedDataKey, option[usedDataKey]);
          } else {
            setValue({ [labelKey]: newValue } as Option);
            onSelectAddOption();
          }
        } else if (newValue && newValue.inputValue) {
          setValue({ [labelKey]: newValue.inputValue } as Option);
          onSelectAddOption();
        } else {
          setValue(newValue);
          setData(usedDataKey, newValue?.[usedDataKey] as Option[keyof Option]);
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
