import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

/**
 * Wrapper component for form fields.
 *
 * Use `title` prop to give the section a title.
 *
 * The `sx` prop will be passed down to the root element.
 */
export default function FieldSection({ title, sx, children }: BoxProps) {
  return (
    <Box sx={{ ...sx, my: 4 }}>
      {title && (
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
      )}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            sm: '1fr',
            md: 'repeat(2, 1fr)',
          },
          gap: 3.2,
          mt: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
