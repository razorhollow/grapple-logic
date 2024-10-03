import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { addDays, parseISO, format, isValid } from "date-fns";

import { prisma } from "~/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
    const { date } = params;

    if (!date || !isValid(parseISO(date))) {
        throw new Response("Invalid date format", { status: 400 });
    }

    const classDays = [1, 3, 5]; // Monday, Wednesday, Friday
    const selectedDate = parseISO(date);

    // Check if the selected date is a class day
    const isClassDay = classDays.includes(selectedDate.getDay());
    if (!isClassDay) {
        return json({ date: selectedDate, isClassDay: false, techniques: [] });
    }

    // Get the techniques scheduled for this date
    const reviews = await prisma.technique.findMany();

    const techniquesForDate = [];

    for (const technique of reviews) {
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
            const dateKey = format(reviewDate, "yyyy-MM-dd");

            if (dateKey === date) {
                techniquesForDate.push({
                    id: technique.id,
                    name: technique.name,
                    category: technique.category,
                    lastIntroduced: technique.lastIntroduced,
                });
            }
        }
    }

    return json({
        date: selectedDate,
        isClassDay: true,
        techniques: techniquesForDate,
    });
}

function getNextClassDate(date: Date): Date {
    const classDays = [1, 3, 5]; // Monday, Wednesday, Friday
    let nextDate = date;
    while (!classDays.includes(nextDate.getDay())) {
        nextDate = addDays(nextDate, 1);
    }
    return nextDate;
}

export default function LessonPlan() {
    const { date, isClassDay, techniques } = useLoaderData<typeof loader>();

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
                <table className="min-w-full rounded-lg bg-white shadow-md">
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
