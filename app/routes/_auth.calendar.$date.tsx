import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { subDays, parse, parseISO, isValid } from "date-fns";

import LessonItem from "~/components/LessonItem";
import { getSchedule } from "~/models/technique.server";
import { requireUserId } from "~/session.server";


export async function loader({ request, params }: LoaderFunctionArgs) {
    const userId = await requireUserId(request)
    const { date } = params;

    if (!date || !isValid(parseISO(date))) {
        throw new Response("Invalid date format", { status: 400 });
    }

    const classDays = [1, 3, 5]; // Monday, Wednesday, Friday
    const selectedDate = parse(date, "yyyy-MM-dd", new Date());

    // Check if the selected date is a class day
    const isClassDay = classDays.includes(selectedDate.getDay());
    if (!isClassDay) {
        return json({ date: selectedDate, isClassDay: false, techniques: [] });
    }

    // Get the techniques scheduled for this date

    const lastClassDate = selectedDate.getDay() === 1 ? subDays(selectedDate, 3) : subDays(selectedDate, 2);
    const lastWeek = subDays(selectedDate, 7);
    const twoWeeks = subDays(selectedDate, 14);
    const oneMonth = subDays(selectedDate, 28);
    const twoMonths = subDays(selectedDate, 56);

    const reviews = await getSchedule(
        userId,
        lastClassDate,
        lastWeek,
        twoWeeks,
        oneMonth,
        twoMonths
    );

    return json({
        date: selectedDate,
        isClassDay: true,
        techniques: reviews,
    });
}

export default function LessonPlan() {
    const { date, isClassDay, techniques } = useLoaderData<typeof loader>();
    console.log('front end stuff: ', date, isClassDay, techniques);

    const formattedDate = new Date(date).toLocaleDateString('en-US', { timeZone: 'UTC'});

    if (!isClassDay) {
        return (
            <div className="mx-auto mt-10 text-center">
                <h1 className="mb-4 text-xl font-bold">{formattedDate}</h1>
                <p className="text-gray-600">No class scheduled on this day.</p>
            </div>
        );
    }

    return (
        <>
        <div className="mx-4 md:mt-8">
            <h1 className="mb-8 text-2xl font-bold text-center">
                Lesson Plan for {formattedDate}
            </h1>
            {techniques.length > 0 ? (
                techniques.map((technique) => (
                    <LessonItem key={technique.id} technique={technique} date={new Date(date)}/>
                ))
            ) : (
                <p className="text-gray-600">
                    No techniques scheduled for review on this day.
                </p>
            )}
        </div>
        <div className="block mt-4">
            <Outlet />
        </div>
        </>
    );
}
