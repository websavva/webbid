import { Img } from '@react-email/components';
import { joinURL } from 'ufo';

import { ctx } from '#server/context';

import { defineEmailComponent } from '../utils';

export const defaultStyle = {
  margin: '0 auto',
};

export const Logo = defineEmailComponent(Img, {
  style: defaultStyle,
  src: joinURL(ctx.env.BASE_URL, '/logo.png'),
  alt: 'Logo',
});
