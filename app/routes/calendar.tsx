import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Outlet, NavLink } from '@remix-run/react';
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    getDay,
    isSameDay,
    addMonths,
    subMonths,
} from 'date-fns';
import { useState } from 'react';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const firstDayCurrentMonth = startOfMonth(currentDate);
    const lastDayCurrentMonth = endOfMonth(currentDate);

    // Generate the days array for the current month view
    const daysInMonth = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: lastDayCurrentMonth,
    });

    // Calculate empty slots before the first day of the month
    const startDayOfWeek = getDay(firstDayCurrentMonth); // 0 (Sunday) to 6 (Saturday)
    const emptyStartDays = Array.from({ length: (startDayOfWeek + 6) % 7 }, () => null);

    // Combine empty slots and actual days
    const calendarDays = [...emptyStartDays, ...daysInMonth];

    const today = new Date();

    const monthYear = format(currentDate, 'LLLL yyyy');

    const handlePrevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    return (
        <div className='w-[50%] mx-auto'>
            <div className="flex items-center">
                <h2 className="flex-auto text-sm font-semibold text-gray-900">{monthYear}</h2>
                <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Previous month</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                    type="button"
                    onClick={handleNextMonth}
                    className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Next month</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
            <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
                <div>S</div>
            </div>
            <div className="mt-2 grid grid-cols-7 text-sm">
                {calendarDays.map((day, dayIdx) => {
                    if (!day) {
                        return <div key={`empty-${dayIdx}`} className="py-2" />;
                    }

                    const isToday = isSameDay(day, today);

                    const formattedDate = format(day, 'yyyy-MM-dd');
                    const dayNumber = format(day, 'd');

                    return (
                        <div
                            key={formattedDate}
                            className={classNames(dayIdx >= 7 ? 'border-t border-gray-200' : '', 'py-2')}
                        >
                            <NavLink to={`/calendar/${formattedDate}`}>
                                <button
                                    type="button"
                                    className={({ isActive }: { isActive: boolean }) =>
                                        classNames(
                                            'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                                            isActive ? 'bg-indigo-500 text-white' : '',
                                            isToday && !isActive ? 'bg-gray-200 text-gray-900' : '',
                                            !isToday && !isActive ? 'text-gray-900 hover:bg-gray-200' : ''
                                        )
                                    }
                                >
                                    <time dateTime={formattedDate}>{dayNumber}</time>
                                </button>
                            </NavLink>
                        </div>
                    );
                })}
            </div>
            <section className='mt-12'>
                <Outlet />
            </section>
        </div>
    );
}
