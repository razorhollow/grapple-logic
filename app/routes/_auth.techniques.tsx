import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, Link, useSearchParams } from '@remix-run/react';
import { CalendarIcon, SparklesIcon, TagIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

import PaginationFooter from '~/components/Pagination';
import { Input } from '~/components/ui/input';
import { prisma } from '~/db.server';
import { requireUserId } from '~/session.server';

const PER_PAGE = 12

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request);
    const url = new URL(request.url);
    const query = url.searchParams
    const currentPage = Math.max(Number(query.get('page')) || 1, 1)
    const options = {
        orderBy: { lastIntroduced: 'desc' as const },
        take: PER_PAGE,
        skip: (currentPage - 1) * PER_PAGE,
        include: { tags: true }, // Include tags for search
    }

    const techniques = await prisma.technique.findMany(options);
    const count = await prisma.technique.count();
    return { techniques, count };
}

export default function TechniquesIndex() {
    const { techniques, count } = useLoaderData<typeof loader>();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1
    const totalPages = Math.ceil(count / PER_PAGE)

    const filteredTechniques = techniques.filter(technique => {
        const searchLower = searchQuery.toLowerCase();
        return (
            technique.name.toLowerCase().includes(searchLower) ||
            (technique.category?.toLowerCase().includes(searchLower)) ||
            technique.tags.some(tag => tag.name.toLowerCase().includes(searchLower))
        );
    });

    return (
        <div className="max-w-4xl mx-auto mt-2">
            <div className="mb-4">
                <Input
                    type="search"
                    placeholder="Search techniques by name, category, or tag..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                />
            </div>
            <table className="text-xs md:text-base min-w-full bg-white shadow-none md:shadow-md rounded-none md:rounded-lg">
                <thead>
                    <tr>
                        <th className="py-1 px-4 border-b">Name</th>
                        <th className="py-1 px-4 border-b">Category</th>
                        <th className="py-1 px-4 border-b">Last Studied</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTechniques.map((technique) => (
                        <tr key={technique.id}>
                            <td className="text-[10px] sm:text-base py-2 px-4 border-b">
                                <Link to={`/techniques/${technique.id}`} className='hover:text-gray-700 capitalize'>
                                    {technique.name}
                                </Link>
                            </td>
                            <td className="text-[10px] sm:text-base py-2 px-4 border-b">{technique.category}</td>
                            <td className="py-2 px-4 border-b">
                                {new Date(technique.lastIntroduced).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-[80%]] text-sm flex justify-between mt-4 px-4 text-gray-400 italic'>
                <p className='text-nowrap hidden sm:block'>
                    Displaying {filteredTechniques.length} items of {count}
                </p>
                <PaginationFooter pageCount={totalPages} />
                <p className='text-nowrap'>Page {currentPage} of {totalPages}</p>
            </div>
        </div>
    );
}
