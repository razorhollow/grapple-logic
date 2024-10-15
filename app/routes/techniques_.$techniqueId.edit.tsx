import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { useLoaderData, Form, useActionData } from '@remix-run/react';

import { prisma } from '~/db.server';

export async function loader({ params }: LoaderFunctionArgs) {
    const technique = await prisma.technique.findUnique({
        where: { id: Number(params.techniqueId) },
    });

    if (!technique) {
        throw new Response('Technique not found', { status: 404 });
    }

    return technique;
}

export async function action({ request, params }: ActionFunctionArgs) {
    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description') as string | null;
    const category = formData.get('category') as string | null;
    const videoLink = formData.get('videoLink') as string | null;
    const lastIntroduced = new Date(formData.get('lastIntroduced') as string) || new Date();

    if (typeof name !== 'string' || name.trim() === '') {
        return { error: 'Technique name is required' };
    }

    await prisma.technique.update({
        where: { id: Number(params.techniqueId) },
        data: {
            name,
            description,
            category,
            videoLink,
            lastIntroduced,
        },
    });

    return redirect('/techniques');
}

export default function EditTechnique() {
    const technique = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-xl font-bold mb-4">Edit Technique</h1>
            <Form method="post" className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Technique Name
                        <input
                            type="text"
                            name="name"
                            defaultValue={technique.name}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                        <textarea
                            name="description"
                            defaultValue={technique.description || ''}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        ></textarea>
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Category
                        <input
                            type="text"
                            name="category"
                            defaultValue={technique.category || ""}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Video Link (Optional)
                        <input
                            type="url"
                            name="videoLink"
                            defaultValue={technique.videoLink || ''}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Last Introduced Date
                        <input
                            type="date"
                            name="lastIntroduced"
                            defaultValue={new Date(technique.lastIntroduced).toISOString().split('T')[0]}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>
                </div>
                {actionData?.error ? <p className="text-red-500">{actionData.error}</p> : null}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500"
                >
                    Update Technique
                </button>
            </Form>
        </div>
    );
}
