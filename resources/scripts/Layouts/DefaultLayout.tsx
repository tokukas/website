import AppHead, { TPropsAppHead } from '@/Components/AppHead';
import Navbar from '@/Components/Navbar';
import DashboardMenu from '@/Components/Navbar/MenuItem/Items/DashboardMenu';
import LoginMenu from '@/Components/Navbar/MenuItem/Items/LoginMenu';
import RegisterMenu from '@/Components/Navbar/MenuItem/Items/RegisterMenu';
import SettingsMenu from '@/Components/Navbar/MenuItem/Items/SettingsMenu';
import useTranslator from '@/Utils/Hooks/useTranslator';
import Container, { ContainerProps } from '@mui/material/Container';
import * as React from 'react';
import BaseLayout from './BaseLayout';

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
  useTranslator([
    'Dashboard',
    'Login',
    'Register',
    'Settings',
  ]);

  return (
    <BaseLayout>
      <AppHead title={title} description={description} />

      <Navbar
        setMainUserMenus={(isUserAuthenticated) => (isUserAuthenticated ? [
          DashboardMenu,
          SettingsMenu,
        ] : [
          LoginMenu,
          RegisterMenu,
          SettingsMenu,
        ])}
      />

      <Container
        maxWidth={maxWidth}
        sx={{
          mt: '70px',
          p: 3,
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
