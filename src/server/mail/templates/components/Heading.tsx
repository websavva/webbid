import { Heading as BaseHeading } from '@react-email/components';
import { defineEmailComponent } from '../utils';

export const Heading = defineEmailComponent(BaseHeading, {
  style: {
    color: '#333',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
});
