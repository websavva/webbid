import { Button as BaseButton, Section } from '@react-email/components';

import { defineEmailComponent } from '../utils';

export const ButtonContainer = defineEmailComponent(Section, {
  style: {
    textAlign: 'center',
  },
});

export const Button = defineEmailComponent(BaseButton, {
  style: {
    backgroundColor: 'rgb(37, 99, 235)',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '15px',
    fontWeight: '500',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'block',
    padding: '12px',
    lineHeight: 1,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
});
