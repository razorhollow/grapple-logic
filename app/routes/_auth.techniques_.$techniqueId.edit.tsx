import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { useLoaderData, Form, useActionData } from '@remix-run/react';

import ComboboxCategories from '~/components/ComboBox';
import { Button } from '~/components/ui/button';
import { prisma } from '~/db.server';
import { getCategories, getTags } from '~/models/technique.server';

export async function loader({ params }: LoaderFunctionArgs) {
    const technique = await prisma.technique.findUnique({
        where: { id: Number(params.techniqueId) },
        include: { tags: true },
    });

    if (!technique) {
        throw new Response('Technique not found', { status: 404 });
    }
    const categories = await getCategories();
    const tags = await getTags();
    const categoryList = categories.map((item) => item.category);

    return { technique, categoryList, tags };
}

export async function action({ request, params }: ActionFunctionArgs) {
    const formData = await request.formData();
    const intent = formData.get('intent') as string | null;
    const name = formData.get('name');
    const description = formData.get('description') as string | null;
    const category = formData.get('category') as string | null;
    const videoLink = formData.get('videoLink') as string | null;
    const lastIntroduced = new Date(formData.get('lastIntroduced') as string) || new Date();
    const tagIds = formData.getAll('tagIds') as string[];

    if (typeof name !== 'string' || name.trim() === '') {
        return { error: 'Technique name is required' };
    }

    if (intent === 'save') {
        await prisma.technique.update({
            where: { id: Number(params.techniqueId) },
            data: {
                name,
                description,
                category,
                videoLink,
                lastIntroduced,
                tags: {
                    set: tagIds.map(id => ({ id })),
                },
            },
        });

        return redirect('/techniques');
    }
    if (intent === 'delete') {
        await prisma.technique.delete({
            where: { id: Number(params.techniqueId) },
        });
    }

    return redirect('/techniques');
}

export default function EditTechnique() {
    const { technique, categoryList, tags } = useLoaderData<typeof loader>();
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
                            rows={5}
                            defaultValue={technique.description || ''}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        ></textarea>
                    </label>
                </div>
                <ComboboxCategories categories={categoryList.filter(category => category !== null) as string[]} />
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
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Tags
                        <select
                            multiple
                            name="tagIds"
                            defaultValue={technique.tags.map(t => t.id)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        >
                            {tags.map((tag) => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <span className="text-sm text-gray-500">Hold Ctrl/Cmd to select multiple tags</span>
                </div>
                {actionData?.error ? <p className="text-red-500">{actionData.error}</p> : null}
                <Button
                    variant="default"
                    name='intent'
                    value='save'
                    type="submit"
                    className="w-full"
                >
                    Update Technique
                </Button>
                <Button
                    variant="destructive"
                    name='intent'
                    value='delete'
                    type="submit"
                    className="w-full"
                >
                    Delete Technique
                </Button>
            </Form>
        </div>
    );
}
