import AppConfig from '@/Config/App';
import { Head } from '@inertiajs/inertia-react';
import React from 'react';

type TPropsAppHead = {
  /**
   * The title of the page.
   */
  title?: string;

  /**
   * The description meta tag is used to provide a short description of the page.
   * This description is used by search engines to display a snippet for the page in search results.
   */
  description?: string;

  children?: React.ReactNode;
}

export default function AppHead({
  title,
  description,
  children,
}: TPropsAppHead) {
  return (
    <Head title={title}>
      <meta name="description" content={description} />
      <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
      {children}
    </Head>
  );
}

AppHead.defaultProps = {
  title: AppConfig.name,
  description: '',
  children: null,
};
