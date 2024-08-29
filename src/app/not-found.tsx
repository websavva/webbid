import ErrorPage from './error';

export default function NotFoundPage() {
  const notFoundError = { message: 'Sorry, Not Found...' };

  return <ErrorPage error={notFoundError} />;
}
