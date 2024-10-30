import { CalendarIcon } from 'lucide-react';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, Link, useSearchParams } from '@remix-run/react';
import { CalendarIcon } from 'lucide-react';

import PaginationFooter from '~/components/Pagination';
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
    }


    const techniques = await prisma.technique.findMany(options);
    const count = await prisma.technique.count();
    return {techniques, count};
}

export default function TechniquesIndex() {
    const {techniques, count} = useLoaderData<typeof loader>();

    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1
    const totalPages = Math.ceil(count / PER_PAGE)

    return (
        <div className="max-w-4xl mx-auto mt-2">
            <table className="text-xs md:text-base min-w-full bg-white shadow-none md:shadow-md rounded-none md:rounded-lg">
                <thead>
                    <tr>
                        <th className="py-1 px-4 border-b">Name</th>
                        <th className="py-1 px-4 border-b">Category</th>
                        <th className="py-1 px-4 border-b"><CalendarIcon /></th>
                    </tr>
                </thead>
                <tbody>
                    {techniques.map((technique) => (
                        <tr key={technique.id}>
                            <td className="text-[10px] sm:text-base py-2 px-4 border-b"><Link to={`/techniques/${technique.id}`} className='hover:text-gray-700 capitalize'>{technique.name}</Link></td>
                            <td className="text-[10px] sm:text-base py-2 px-4 border-b">{technique.category}</td>
                            <td className="py-2 px-4 border-b">
                                {new Date(technique.lastIntroduced).toLocaleDateString('en-US', { timeZone: 'UTC'})}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div  className='text-sm flex justify-between mt-4 mx-4 text-gray-400 italic'>
              <p className='hidden sm:block'>Displaying {techniques.length} items of {count}</p>
              <p>Page {currentPage} of {totalPages}</p>
            </div>
            <PaginationFooter pageCount={totalPages} />
        </div>
    );
}
