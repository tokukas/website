import { RequiredFor } from '@/Utils/Types';
import Autocomplete, {
  AutocompleteProps, createFilterOptions,
} from '@mui/material/Autocomplete';
import React from 'react';

export type BaseOption = Record<string, string> & {
  inputValue?: string;
};

export type AutocompleteAddOptionBaseProps<T extends BaseOption> = {
  /**
   * Determine which prop that used as the data.
   */
  dataKey?: keyof Omit<T, 'inputValue'>;
  /**
   * Determine which prop that used as the label.
   */
  labelKey: keyof Omit<T, 'inputValue'>;
  /**
   * Handle action when Add Option is selected.
   */
  onSelectAddOption: () => void;
  /**
   * Handle action to set the data.
   */
  setData: (value: T[keyof T]) => void;
  /**
   * Handle action to set the value.
   */
  setValue: (value: T | null) => void;
};

export type FreeSoloAutocompleteProps<T> = Omit<
  AutocompleteProps<T, false, false, true>,
  'freeSolo' | 'multiple' | 'disableClearable' | 'clearOnBlur'
>;

export type TPropsAutocompleteAddOption<
  T extends BaseOption
> = AutocompleteAddOptionBaseProps<T> & RequiredFor<
  FreeSoloAutocompleteProps<T>,
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
export default function AutocompleteAddOption<T extends BaseOption>({
  dataKey,
  labelKey,
  onSelectAddOption,
  options,
  setData,
  setValue,
  value,
  ...otherProps
}: TPropsAutocompleteAddOption<T>) {
  const filterOptions = createFilterOptions<T>();

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
          opt[labelKey].toUpperCase() === state.inputValue.trim().toUpperCase()
        ));

        if (state.inputValue && !findOption) {
          filtered.push({
            [labelKey]: `Add "${state.inputValue}"`,
            inputValue: state.inputValue,
          } as T);
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
            opt[labelKey].toUpperCase() === newValue.trim().toUpperCase()
          ));

          if (option) {
            event.preventDefault();
            setValue(option);
            setData(option[dataKey ?? labelKey]);
          } else {
            setValue({ [labelKey]: newValue } as T);
            onSelectAddOption();
          }
        } else if (newValue && newValue.inputValue) {
          setValue({ [labelKey]: newValue.inputValue } as T);
          onSelectAddOption();
        } else {
          setValue(newValue);
          setData(newValue?.[dataKey ?? labelKey] as T[keyof T]);
        }
      }}
    />
  );
}

AutocompleteAddOption.defaultProps = {
  dataKey: undefined,
};
