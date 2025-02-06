import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import { Form, NavLink, useActionData, useLoaderData, useNavigation } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import ComboboxCategories from '~/components/ComboBox';
import { Button } from '~/components/ui/button';
import { createTechnique, getCategories, getTags } from '~/models/technique.server';
import { requireUserId } from '~/session.server';

interface FormErrors {
    name?: string;
    description?: string;
    category?: string;
    _form?: string;
}

interface ActionData {
    success?: boolean;
    message?: string;
    errors?: FormErrors;
}

export async function loader() {
    const categories = await getCategories();
    const tags = await getTags();
    const categoryList = categories.map((item) => item.category);

    return { categoryList, tags };
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
    const tagIds = formData.getAll('tagIds') as string[];

    const errors: FormErrors = {};

    if (typeof name !== 'string' || name.trim() === '') {
        errors.name = 'Technique name is required';
    }

    if (typeof description !== 'string' || description.trim() === '') {
        errors.description = 'Technique description is required';
    }

    if (typeof category !== 'string' || category.trim() === '') {
        errors.category = 'Category is required';
    }

    if (Object.keys(errors).length > 0) {
        return json({ errors }, { status: 400 });
    }

    try {
        await createTechnique({
            name: name as string,
            description: description as string,
            category: category as string,
            videoLink,
            lastIntroduced,
            userId,
            tagIds,
        });

        if (intent === 'save-and-close') {
            return redirect('/techniques');
        }

        return json(
            { success: true, message: "Technique created successfully" },
            { status: 200 }
        );
    } catch (error) {
        return json(
            { errors: { _form: "Failed to create technique" } },
            { status: 500 }
        );
    }
}

export default function AddTechnique() {
    const actionData = useActionData<ActionData>();
    const { categoryList, tags } = useLoaderData<typeof loader>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const formRef = useRef<HTMLFormElement>(null);
    const techniqueNameRef = useRef<HTMLInputElement>(null);
    const [newTagName, setNewTagName] = useState('');
    const [isCreatingTag, setIsCreatingTag] = useState(false);

    useEffect(() => {
        if (actionData?.success) {
            formRef.current?.reset();
            techniqueNameRef.current?.focus();
            toast.success(actionData.message);
        }
    }, [actionData]);

    const handleCreateTag = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTagName.trim()) {
            toast.error("Tag name cannot be empty");
            return;
        }

        setIsCreatingTag(true);
        try {
            const response = await fetch('/api/tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newTagName }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to create tag');
            }

            const result = await response.json();
            toast.success('Tag created successfully');
            setNewTagName('');
            // Reload the page to get updated tags
            window.location.reload();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to create tag');
        } finally {
            setIsCreatingTag(false);
        }
    };

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
                            className={`mt-1 block w-full border rounded-md p-2 ${
                                actionData?.errors?.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                    </label>
                    {actionData?.errors?.name && (
                        <p className="text-red-500 text-sm mt-1">{actionData.errors.name}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                        <textarea
                            name="description"
                            rows={5}
                            className={`mt-1 block w-full border rounded-md p-2 ${
                                actionData?.errors?.description ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                    </label>
                    {actionData?.errors?.description && (
                        <p className="text-red-500 text-sm mt-1">{actionData.errors.description}</p>
                    )}
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
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Tags
                    </label>
                    
                    {/* Add new tag form */}
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={newTagName}
                            onChange={(e) => setNewTagName(e.target.value)}
                            placeholder="New tag name"
                            className="flex-1 border border-gray-300 rounded-md p-2"
                            disabled={isCreatingTag}
                        />
                        <Button
                            type="button"
                            onClick={handleCreateTag}
                            variant="outline"
                            size="sm"
                            disabled={isCreatingTag}
                        >
                            {isCreatingTag ? 'Adding...' : 'Add Tag'}
                        </Button>
                    </div>

                    {/* Existing tag select */}
                    <select
                        multiple
                        name="tagIds"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
                            </option>
                        ))}
                    </select>
                    <span className="text-sm text-gray-500">Hold Ctrl/Cmd to select multiple tags</span>
                </div>
                <div className='flex justify-between'>
                    <Button variant="destructive" asChild><NavLink to="/techniques">Cancel</NavLink></Button>
                    <Button 
                        name='intent' 
                        value="save-and-close" 
                        variant='outline'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Adding...' : 'Add and Close'}
                    </Button>
                    <Button 
                        name='intent' 
                        value="save-and-add-another"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Adding...' : 'Add and Continue'}
                    </Button>
                </div>

                {actionData?.errors?._form && (
                    <p className="text-red-500 text-center">{actionData.errors._form}</p>
                )}
            </Form>
        </div>
    );
}