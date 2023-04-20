import AppHead, { TPropsAppHead } from '@/Components/AppHead';
import Navbar from '@/Components/Navbar';
import BaseLayout from '@/Layouts/BaseLayout';
import Container, { ContainerProps } from '@mui/material/Container';
import React from 'react';

export type TPropsDefaultLayout = Omit<TPropsAppHead, 'children'> & {
  /**
   * The children to be rendered.
   */
  children?: React.ReactNode;
  /**
   * Determine the max-width of the wrapper container.
   * The wrapper width grows with the size of the screen. Set to false to disable maxWidth.
   *
   * @default 'lg'
   */
  maxWidth?: ContainerProps['maxWidth'];
}

export default function DefaultLayout({
  children,
  description,
  maxWidth,
  title,
}: TPropsDefaultLayout) {
  return (
    <BaseLayout>
      <AppHead title={title} description={description} />

      <Navbar />

      <Container
        maxWidth={maxWidth}
        sx={{
          mt: '70px',
        }}
      >
        {children}
      </Container>
    </BaseLayout>
  );
}

DefaultLayout.defaultProps = {
  children: undefined,
  maxWidth: 'lg',
};
