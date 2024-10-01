import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData, Link } from '@remix-run/react';
import { useState } from 'react';


import { prisma } from '~/db.server';

export async function loader({ request }: LoaderFunctionArgs) {
    const techniques = await prisma.technique.findMany({
        orderBy: { lastIntroduced: 'asc' },
    });
    return techniques;
}

export default function TechniquesIndex() {
    const techniques = useLoaderData<typeof loader>();
    const [open, setOpen] = useState(false);

    return (
        <div className="max-w-4xl mx-auto mt-10">
            {/* Modal Section   */}
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <div className='fixed inset-0'/>

                <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">Panel title</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                        <Outlet />
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">{/* Your content */}</div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
            </Dialog>

            <h1 className="text-2xl font-bold mb-4">All Techniques</h1>
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Category</th>
                        <th className="py-2 px-4 border-b">Last Introduced</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {techniques.map((technique) => (
                        <tr key={technique.id}>
                            <td className="py-2 px-4 border-b">{technique.name}</td>
                            <td className="py-2 px-4 border-b">{technique.category}</td>
                            <td className="py-2 px-4 border-b">
                                {new Date(technique.lastIntroduced).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4 border-b">
                                <Link
                                    to={`/techniques/${technique.id}/edit`}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
