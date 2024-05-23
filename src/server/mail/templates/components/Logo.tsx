import { Img } from '@react-email/components';

import { defineEmailComponent } from '../utils';
import { toAbsoluteUrl } from '@/lib/utils/toAbsoluteUrl';

export const defaultStyle = {
  margin: '0 auto',
};

export const Logo = defineEmailComponent(Img, {
  style: defaultStyle,
  src: toAbsoluteUrl('/logo.png'),
  alt: 'Logo',
});
