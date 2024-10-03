import { LoaderFunction, redirect } from '@remix-run/node';
import { format } from 'date-fns';

export const loader: LoaderFunction = async () => {
  const today = new Date();
  const formattedDate = format(today, 'yyyy-MM-dd');
  return redirect(`/calendar/${formattedDate}`);
};
