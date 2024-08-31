import { Text as BaseText } from '@react-email/components';

import { defineEmailComponent } from '../utils';

export const Text = defineEmailComponent(BaseText, {
  style: {
    color: '#333',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    margin: '24px 0',
  },
});
