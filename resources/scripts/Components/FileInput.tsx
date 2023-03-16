import { styled } from '@mui/material/styles';
import { MuiFileInput, MuiFileInputProps } from 'mui-file-input';
import React from 'react';

export default function FileInput<T extends boolean = false>(
  props: MuiFileInputProps<T>,
) {
  /**
   * Fix the styling of [`MuiFileInput`](https://github.com/viclafouch/mui-file-input) component.
   *
   * Make label width to be responsive to the container width.
   *
   * This issue present especially when `fullWidth` is `true`.
   */
  const FixedMuiFileInput = styled(MuiFileInput<T>)`
    & label {
      width: 100%;
    }
  `;

  return (
    <FixedMuiFileInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}
