import { Link as BaseLink } from '@react-email/components';

import { defineEmailComponent } from '../utils';

export const Link = defineEmailComponent(BaseLink, {
  style: {
    color: '#2754C5',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    textDecoration: 'underline',
  },

  target: '_blank',
});
