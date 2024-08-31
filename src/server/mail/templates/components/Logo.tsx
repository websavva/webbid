import { Img } from '@react-email/components';

import { toAbsoluteUrl } from '@/lib/utils/toAbsoluteUrl';

import { defineEmailComponent } from '../utils';

export const defaultStyle = {
  margin: '0 auto',
};

export const Logo = defineEmailComponent(Img, {
  style: defaultStyle,
  src: toAbsoluteUrl('/logo.png'),
  alt: 'Logo',
});
