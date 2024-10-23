import { LoaderFunction, redirect } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  const today = new Date().toISOString().split('T')[0];
  return redirect(`/calendar/${today}`);
};
