import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { addDays, parseISO, format, isValid } from 'date-fns';

import { prisma } from '~/db.server';

export async function loader({ params }: LoaderFunctionArgs) {
    const { date } = params;

    if (!date || !isValid(parseISO(date))) {
        throw new Response('Invalid date format', { status: 400 });
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
            const dateKey = format(reviewDate, 'yyyy-MM-dd');

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

    const formattedDate = format(new Date(date), 'MMMM d, yyyy (EEEE)');

    if (!isClassDay) {
        return (
            <div className="max-w-md mx-auto mt-10 text-center">
                <h1 className="text-xl font-bold mb-4">{formattedDate}</h1>
                <p className="text-gray-600">No class scheduled on this day.</p>
                <Link to="/calendar" className="text-indigo-600 hover:underline mt-4 block">
                    Back to Calendar
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Lesson Plan for {formattedDate}</h1>
            {techniques.length > 0 ? (
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Technique Name</th>
                            <th className="py-2 px-4 border-b">Category</th>
                            <th className="py-2 px-4 border-b">Last Introduced</th>
                        </tr>
                    </thead>
                    <tbody>
                        {techniques.map((technique) => (
                            <tr key={technique.id}>
                                <td className="py-2 px-4 border-b">{technique.name}</td>
                                <td className="py-2 px-4 border-b">{technique.category}</td>
                                <td className="py-2 px-4 border-b">
                                    {format(new Date(technique.lastIntroduced), 'MMMM d, yyyy')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600">No techniques scheduled for review on this day.</p>
            )}
            <Link to="/calendar" className="text-indigo-600 hover:underline mt-4 block">
                Back to Calendar
            </Link>
        </div>
    );
}
