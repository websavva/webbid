import { Hr as BaseHr } from '@react-email/components';

import { defineEmailComponent } from '../utils';

export const Hr = defineEmailComponent(BaseHr, {
  style: {
    borderColor: '#cccccc',
    margin: '20px 0',
  },
});
