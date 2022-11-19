import AppConfig from '@/Config/App';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

type TPropsBrandLogo = SvgIconProps & {
  /**
   * The width of the logo.
   *
   * @default '1.5em'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/width
   */
  width?: string | number;

  /**
   * The height of the logo.
   *
   * @default 'auto'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/height
   */
  height?: string | number;
}

export default function BrandLogo({
  width, height, titleAccess, sx, ...props
}: TPropsBrandLogo) {
  return (
    <SvgIcon
      viewBox="0 0 348.11548 196.5336"
      titleAccess={titleAccess ?? AppConfig.name}
      sx={{ width, height, ...sx }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <path
        // eslint-disable-next-line max-len
        d="M346.602 181.688c-41.26-46.05-122.66-39.06-155.52 13.34l-16.65-168.59-17.13 168.58c-21.566-21.78-43.778-95.687-36.54-128.52q14.22 4.935 28.43 9.87-12.495-25.35-25-50.68-25.005 12.84-50 25.68 11.67 3.885 23.35 7.78c-4.023 27.46 1.293 73.62 9.91 97.13-32.492-14.67-87.402 1.894-105.67 25.41q32.61-81.54 65.23-163.08c59.04-42.55 134.448-6.583 162.82 71.03a71904.09 71904.09 0 0 0-28.57 10.582l47.93 25.768 28.83-52.02q-6.545 2.187-13.26 4.336-7.719 2.47-15.285 4.766a151.229 151.229 0 0 0-50.465-78.832c20.586-8.357 66.13-.266 82.369 14.373l65.22 163.077Z"
      />
    </SvgIcon>
  );
}

BrandLogo.defaultProps = {
  width: '1.5em',
  height: 'auto',
};
