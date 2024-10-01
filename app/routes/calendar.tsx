import { LoaderFunctionArgs, json } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import {
    addDays,
    format,
    getDay,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
} from 'date-fns';

import { prisma } from '~/db.server';

function getNextClassDate(date: Date): Date {
    const classDays = [1, 3, 5]; // Monday, Wednesday, Friday
    let nextDate = date;
    while (!classDays.includes(getDay(nextDate))) {
        nextDate = addDays(nextDate, 1);
    }
    return nextDate;
}

export async function loader({ request }: LoaderFunctionArgs) {
    const techniques = await prisma.technique.findMany();
    const reviews = [];

    for (const technique of techniques) {
        const lastIntroduced = new Date(technique.lastIntroduced);
        const reviewIntervals = [0, 7, 14, 28]; // days after lastIntroduced
        for (const interval of reviewIntervals) {
            let reviewDate;
            if (interval === 0) {
                reviewDate = getNextClassDate(lastIntroduced);
            } else {
                const dateAfterInterval = addDays(lastIntroduced, interval);
                reviewDate = getNextClassDate(dateAfterInterval);
            }
            const dateKey = format(reviewDate, 'yyyy-MM-dd');
            reviews.push({
                techniqueId: technique.id,
                techniqueName: technique.name,
                date: dateKey,
                category: technique.category,
            });
        }
    }

    const now = new Date();
    const startDate = startOfMonth(now);
    const endDate = endOfMonth(now);
    const daysArray = eachDayOfInterval({ start: startDate, end: endDate });

    const classDaysOfWeek = [1, 3, 5]; // Monday, Wednesday, Friday

    // Calculate the day of the week the month starts on
    const startDayOfWeek = getDay(startDate); // 0 (Sunday) to 6 (Saturday)

    // Create empty cells for days before the first day of the month
    const emptyStartDays = Array.from({ length: startDayOfWeek }, () => null);

    // Calculate the number of weeks in the month view (at least 5)
    const totalDays = emptyStartDays.length + daysArray.length;
    const totalWeeks = Math.ceil(totalDays / 7);
    const totalCells = totalWeeks * 7;

    // Create empty cells for days after the last day of the month
    const emptyEndDays = Array.from({ length: totalCells - totalDays }, () => null);

    // Combine empty start days, actual days, and empty end days
    const calendarDays = [...emptyStartDays, ...daysArray, ...emptyEndDays];

    const days = calendarDays.map((day) => {
        if (day === null) {
            return {
                date: null,
                dayNumber: null,
                isToday: false,
                isClassDay: false,
            };
        } else {
            const isToday = isSameDay(day, now);
            const isClassDay = classDaysOfWeek.includes(getDay(day));
            return {
                date: format(day, 'yyyy-MM-dd'),
                dayNumber: format(day, 'd'),
                isToday,
                isClassDay,
            };
        }
    });

    const dayReviews: Record<string, string[]> = {};
    for (const day of days) {
        if (day.date) {
            dayReviews[day.date] = [];
        }
    }
    for (const review of reviews) {
        if (dayReviews[review.date]) {
            dayReviews[review.date].push(review.techniqueName);
        }
    }

    return json({ days, dayReviews });
}


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Calendar() {
    const { days, dayReviews } = useLoaderData<typeof loader>();
    const now = new Date();
    const currentMonth = format(now, 'LLLL yyyy');

    return (
        <div>
            <h2 className="text-base font-semibold leading-6 text-gray-900">Jiu-Jitsu Class Calendar</h2>
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                <div className="mt-10 lg:col-start-1 lg:col-end-8">
                    <div className="flex items-center text-gray-900">
                        <div className="flex-auto text-sm font-semibold text-center">{currentMonth}</div>
                    </div>
                    <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                            <div key={day}>{day}</div>
                        ))}
                    </div>
                    <div className="isolate mt-2 grid grid-cols-7 gap-px bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                        {days.map((day) => (
                            <Link
                                key={day.date}
                                to={`/calendar/${day.date}`}
                                className={classNames(
                                    'py-1.5 text-center',
                                    day.isToday ? 'bg-indigo-200' : 'bg-white',
                                    day.isClassDay ? 'font-semibold' : 'text-gray-400',
                                    'hover:bg-gray-100'
                                )}
                            >
                                <time dateTime={day.date}>{day.dayNumber}</time>
                                {dayReviews[day.date]?.length > 0 ? <ul className="mt-1 text-xs text-gray-700">
                                        {dayReviews[day.date].map((technique, idx) => (
                                            <li key={idx}>{technique}</li>
                                        ))}
                                    </ul> : null}
                            </Link>
                        ))}
                    </div>
                    <Link
                        to="/add-technique"
                        className="mt-8 inline-block w-full text-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
                    >
                        Add Technique
                    </Link>
                </div>
            </div>
            <Outlet />
        </div>
    );
}