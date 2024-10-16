import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { subDays, parse, parseISO, format, isValid } from "date-fns";

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
    const targetDates = [lastClassDate, lastWeek, twoWeeks, oneMonth, twoMonths];
    console.log('targetDates', targetDates);
    console.log('selectedDate', selectedDate);

    const reviews = await getSchedule(
        userId,
        lastClassDate,
        lastWeek,
        twoWeeks,
        oneMonth,
        twoMonths
    );

    console.log('reviews', reviews);

    return json({
        date: selectedDate,
        isClassDay: true,
        techniques: reviews,
    });
}

export default function LessonPlan() {
    const { date, isClassDay, techniques } = useLoaderData<typeof loader>();
    console.log('front end stuff: ', date, isClassDay, techniques);

    const formattedDate = format(new Date(date), "MMMM d, yyyy (EEEE)");

    if (!isClassDay) {
        return (
            <div className="mx-auto mt-10 max-w-md text-center">
                <h1 className="mb-4 text-xl font-bold">{formattedDate}</h1>
                <p className="text-gray-600">No class scheduled on this day.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto mt-10 max-w-4xl">
            <h1 className="mb-4 text-2xl font-bold">
                Lesson Plan for {formattedDate}
            </h1>
            {techniques.length > 0 ? (
                <table className="min-w-full rounded-lg bg-white shadow-md text-xs md:text-base">
                    <thead>
                        <tr>
                            <th className="border-b px-4 py-2">Technique Name</th>
                            <th className="border-b px-4 py-2">Category</th>
                            <th className="border-b px-4 py-2">Last Introduced</th>
                        </tr>
                    </thead>
                    <tbody>
                        {techniques.map((technique) => (
                            <tr key={technique.id}>
                                <td className="border-b px-4 py-2">{technique.name}</td>
                                <td className="border-b px-4 py-2">{technique.category}</td>
                                <td className="border-b px-4 py-2">
                                    {format(new Date(technique.lastIntroduced), "MMMM d, yyyy")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600">
                    No techniques scheduled for review on this day.
                </p>
            )}
        </div>
    );
}
