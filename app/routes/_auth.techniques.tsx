import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';

import { prisma } from '~/db.server';
import { requireUserId } from '~/session.server';



export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request);
    const techniques = await prisma.technique.findMany({
        orderBy: { lastIntroduced: 'desc' },
    });
    return techniques;
}

export default function TechniquesIndex() {
    const techniques = useLoaderData<typeof loader>();

    return (
        <div className="max-w-4xl mx-auto mt-10">
            {/* Modal Section   */}

            <h1 className="text-2xl font-bold mb-4">All Techniques</h1>
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Category</th>
                        <th className="py-2 px-4 border-b">Last Introduced</th>
                    </tr>
                </thead>
                <tbody>
                    {techniques.map((technique) => (
                        <tr key={technique.id}>
                            <td className="py-2 px-4 border-b"><Link to={`/techniques/${technique.id}`} className='hover:text-gray-700'>{technique.name}</Link></td>
                            <td className="py-2 px-4 border-b">{technique.category}</td>
                            <td className="py-2 px-4 border-b">
                                {new Date(technique.lastIntroduced).toLocaleDateString('en-US', { timeZone: 'UTC'})}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
