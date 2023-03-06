import Grid from '@mui/material/Grid';
import Box, { BoxProps } from '@mui/material/Box';
import React from 'react';
import Label from './Label';
import Data from './Data';

export type TData = {
  /**
   * If not set, the key will same as `label`.
   */
  key?: string;
  /**
   * The label.
   */
  label: string;
  /**
   * If set, the data will not rendered inside `Data` component.
   */
  disabledDataStyle?: boolean;
  /**
   * Set the placeholder if data is empty.
   *
   * @default 'None'
   */
  placeholder?: React.ReactNode;
  /**
   * Override the component to render the label.
   */
  renderLabel?: (label: string) => React.ReactNode;
  /**
   * The value.
   */
  value?: React.ReactNode;
};

export type VerticalTableProps = BoxProps & {
  data: TData[];
  /**
   * If set, it will override the placeholder for all rows of data.
   */
  placeholder?: React.ReactNode;
}

export default function VerticalTable({
  data,
  placeholder,
  sx,
  ...tableParams
}: VerticalTableProps) {
  return (
    <Box
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...tableParams}
      sx={{ mt: 2, ...sx }}
    >
      {data.map(({
        key,
        label,
        value,
        disabledDataStyle,
        placeholder: rowPlaceholder,
        renderLabel,
      }) => (
        <Grid
          container
          spacing={0.25}
          mt={1.5}
          key={key ?? label}
        >
          <Grid item xs={12} sm={4} md={3} lg={2}>
            {renderLabel ? renderLabel(label) : (
              <Label>{label}</Label>
            )}
          </Grid>
          <Grid item xs={12} sm={7} md={8} lg={9}>
            {disabledDataStyle ? value : (
              <Data empty={!value}>
                {value ?? placeholder ?? rowPlaceholder ?? 'None'}
              </Data>
            )}
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}

VerticalTable.defaultProps = {
  placeholder: undefined,
};
