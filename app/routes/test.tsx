import { format, getDay, subDays, subWeeks } from "date-fns";

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
      test 
    </div>
  );
}