import AppConfig from '@/Config/App';
import { Head } from '@inertiajs/react';
import React from 'react';

export type TPropsAppHead = {
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
      {children}
    </Head>
  );
}

AppHead.defaultProps = {
  title: AppConfig.name,
  description: AppConfig.description,
  children: null,
};
