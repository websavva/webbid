import { Button as BaseButton, Section } from '@react-email/components';

import { defineEmailComponent } from '../utils';

export const ButtonContainer = defineEmailComponent(Section, {
  style: {
    textAlign: 'center',
  },
});

export const Button = defineEmailComponent(BaseButton, {
  style: {
    backgroundColor: '#5F51E8',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'block',
    padding: '12px',
  },
});
