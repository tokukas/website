/* eslint-disable import/prefer-default-export */
import { Image } from '@/Entities/Image';
import route from 'ziggy-js';

type Options = {
  /**
   * Height of the image in pixels.
   *
   * If the `width` is not specified, the image will be resized proportionally.
   */
  height?: number;
  /**
   * Quality of the image between 0 and 100.
   *
   * This option is only available for 'jpg' `type`.
   *
   * @default 90
   */
  quality?: number;
  /**
   * Type of the image.
   *
   * If the `type` is not specified, the original image type will be used.
   */
  type?: 'jpg' | 'png' | 'gif' | 'tif' | 'bmp' | 'ico' | 'psd' | 'webp'
    | 'data-url';
  /**
   * Width of the image in pixels.
   *
   * If the `height` is not specified, the image will be resized proportionally.
   */
  width?: number;
};

export const getImageUrl = (
  image: Image,
  options?: Options,
) => route('images.show', {
  image,
  ...options,
});
