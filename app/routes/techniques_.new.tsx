import { ActionFunctionArgs, redirect, json } from '@remix-run/node';
import { Form, NavLink, useActionData, useLoaderData, useNavigation } from '@remix-run/react';
import { useEffect, useRef } from 'react';

import ComboboxCategories from '~/components/ComboBox';
import { Button } from '~/components/ui/button';
import { createTechnique, getCategories } from '~/models/technique.server';
import { requireUserId } from '~/session.server';


export async function loader() {
    const categories = await getCategories();
    //create an array from the values of the object
    const categoryList = categories.map((item) => item.category);

    return { categoryList };
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const category = formData.get('category');
    const videoLink = formData.get('videoLink') as string | null;
    const lastIntroduced = new Date(formData.get('lastIntroduced') as string) || new Date();
    const userId = await requireUserId(request);
    const intent = formData.get('intent');

    if (typeof name !== 'string' || name.trim() === '') {
        return json({ error: 'Technique name is required' }, { status: 400 });
    }

    if (typeof description !== 'string') {
        return json({ error: 'Technique description is required' }, { status: 400 });
    }

    if (typeof category !== 'string' || category.trim() === '') {
        return json({ error: 'Category is required' }, { status: 400 });
    }

    await createTechnique({
        name,
        description,
        category,
        videoLink,
        lastIntroduced,
        userId,
    });

    if (intent === 'save-and-close') return redirect('/calendar');

    return redirect('/techniques/new');
}

export default function AddTechnique() {
    const actionData = useActionData<typeof action>();
    const { categoryList } = useLoaderData <typeof loader>();
    const navigation = useNavigation()
    const isAdding = navigation.state === 'submitting'
    const formRef = useRef<HTMLFormElement>(null)
    const techniqueNameRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!isAdding) {
            formRef.current?.reset()}
            techniqueNameRef.current?.focus()
    }, [isAdding])

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-xl font-bold mb-4">Add New Technique</h1>
            <Form ref={formRef} method="post" className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Technique Name
                        <input
                            ref={techniqueNameRef}
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
                {/* <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Category
                        <input
                            type="text"
                            name="category"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>
                </div> */}
                <ComboboxCategories categories={categoryList.filter(category => category !== null) as string[]} />
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
                <div className='flex justify-between'>
                    <Button variant="destructive" asChild><NavLink to="/techniques">Cancel</NavLink></Button>
                    <Button name='intent' value="save-and-close" variant='outline'>
                        Add and Close
                    </Button>
                    <Button name='intent' value="save-and-add-another">
                        Add and Continue
                    </Button>
                </div>
            </Form>
        </div>
    );
}