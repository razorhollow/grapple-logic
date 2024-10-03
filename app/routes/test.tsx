
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { format, getDay, subDays, subWeeks } from "date-fns";

import { requireUserId } from '~/session.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  // Retrieve data based on params or request
  // const data = await someDatabaseFunction(params.id);

  return json({ data });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const date = formData.get("date");

  if (typeof date !== "string" || date.length === 0) {
    return json(
      { errors: { body: null, title: "Date is required" } },
      { status: 400 },
    );
  }

  console.log('Date: ', date);
  console.log('Type of Date: ', typeof date);
  // const note = await createNote({ body, title, userId });

  return redirect(`/notes/${note.id}`);
};

export default function test() {
  const date = format(new Date(), 'MM/dd/yyyy');
  const dayOfWeek = getDay(date);

  function getLastClass(date: Date) {
    if (dayOfWeek === 1) {
      return format(subDays(date, 3), 'MM/dd/yyyy');
    } else {
      return format(subDays(date, 2), 'MM/dd/yyyy')
    }

  }

  const lastClass = getLastClass(new Date());
  const lastWeek = format(subWeeks(date, 1), 'MM/dd/yyyy');
  const twoWeeksAgo = format(subWeeks(date, 2), 'MM/dd/yyyy');
  const oneMonthAgo = format(subWeeks(date, 4), 'MM/dd/yyyy');

  console.log('Today is: ', date);
  console.log('Last week was: ', lastWeek);
  console.log('Two weeks ago was: ', twoWeeksAgo);
  console.log('One month ago was: ', oneMonthAgo);
  return (
    <div>
      <p>Todays Date: {date}</p>
      <p>Last Class: {lastClass}</p>
      <p>Last Week: {lastWeek}</p>
      <p>Two Weeks Ago: {twoWeeksAgo}</p>
      <p>One Month Ago: {oneMonthAgo}</p>
      <form method='POST'>
        <input type="date" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// function getLastClass(date: Date) {
//   if (dayOfWeek === 1) {
//       return subDays(date, 3);
//   } else {
//       return subDays(date, 2)
//   }

// }

// const lastClass = getLastClass(new Date());
// const lastWeek = subWeeks(date, 1);
// const twoWeeksAgo = subWeeks(date, 2);
// const oneMonthAgo = subWeeks(date, 4);