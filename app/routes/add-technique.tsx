import { ActionFunctionArgs, redirect, json } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';

import { prisma } from '~/db.server';

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const category = formData.get('category');
    const videoLink = formData.get('videoLink') as string | null;
    const lastIntroduced = new Date(formData.get('lastIntroduced') as string) || new Date();

    if (typeof name !== 'string' || name.trim() === '') {
        return json({ error: 'Technique name is required' }, { status: 400 });
    }

    if (typeof description !== 'string') {
        return json({ error: 'Technique description is required' }, { status: 400 });
    }

    if (typeof category !== 'string' || category.trim() === '') {
        return json({ error: 'Category is required' }, { status: 400 });
    }

    await prisma.technique.create({
        data: {
            name,
            description,
            category,
            videoLink,
            lastIntroduced,
        },
    });

    return redirect('/calendar');
}

export default function AddTechnique() {
    const actionData = useActionData<typeof action>();
    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-xl font-bold mb-4">Add New Technique</h1>
            <Form method="post" className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Technique Name
                        <input
                            type="text"
                            name="name"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                        <textarea
                            name="description"
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
                            defaultValue={new Date().toISOString().split('T')[0]}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>
                </div>
                {actionData?.error ? <p className="text-red-500">{actionData.error}</p> : null}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500"
                >
                    Add Technique
                </button>
            </Form>
        </div>
    );
}