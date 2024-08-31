import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';

import ProfileClientPage from './page_client';

vi.mock('@/hooks/use-auth', () => {
  return {
    useAuth: () => ({
      user: {
        email: 'fake-email',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      setAuthInfo: () => ({}),
    }),
  };
});

describe('ProfilePage', () => {
  it('Should render email', () => {
    const { getByTestId } = render(<ProfileClientPage />);

    expect(getByTestId('email')).toHaveTextContent('fake-email');
  });
});
