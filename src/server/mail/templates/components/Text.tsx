import { Text as BaseText } from '@react-email/components';
import { defineEmailComponent } from '../utils';

export const Text = defineEmailComponent(BaseText, {
  style: {
    fontSize: '16px',
    lineHeight: '1.65',
  },
});
