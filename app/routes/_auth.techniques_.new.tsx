import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import { Form, NavLink, useActionData, useLoaderData, useNavigation } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

import ComboboxCategories from '~/components/ComboBox';
import { Button } from '~/components/ui/button';
import { createTechnique, getCategories, getTags } from '~/models/technique.server';
import { requireUserId } from '~/session.server';
import { uploadToCloudinary } from '~/utils/cloudinary.server';
import { prisma } from '~/db.server';

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
    
    // Get all images and captions
    const images = formData.getAll('images') as File[];
    const captions = formData.getAll('captions') as string[];

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
        // Create technique first
        const technique = await createTechnique({
            name: name as string,
            description: description as string,
            category: category as string,
            videoLink,
            lastIntroduced,
            userId,
            tagIds,
        });

        // Handle image uploads
        const imagePromises = images
            .filter(image => image.size > 0) // Filter out empty file inputs
            .map(async (image, index) => {
                const imageUrl = await uploadToCloudinary(image);
                return prisma.techniqueReference.create({
                    data: {
                        techniqueId: technique.id,
                        imageUrl,
                        caption: captions[index] || null
                    }
                });
            });

        await Promise.all(imagePromises);

        if (intent === 'save-and-close') {
            return redirect('/techniques');
        }

        return json(
            { success: true, message: "Technique created successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error creating technique:', error);
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
    const [imageInputs, setImageInputs] = useState([{ id: 0 }]);

    useEffect(() => {
        if (actionData?.success) {
            formRef.current?.reset();
            techniqueNameRef.current?.focus();
            toast.success(actionData.message);
        } else if (actionData?.errors) {
            // Show error toast for form-level errors
            if (actionData.errors._form) {
                toast.error(actionData.errors._form);
            }
            // Show validation errors
            else if (Object.keys(actionData.errors).length > 0) {
                toast.error("Please fix the validation errors");
            }
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

    const addImageInput = () => {
        setImageInputs([...imageInputs, { id: imageInputs.length }]);
    };

    const removeImageInput = (id: number) => {
        setImageInputs(imageInputs.filter(input => input.id !== id));
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-xl font-bold mb-4">Add New Technique</h1>
            <Form ref={formRef} method="post" className="space-y-4" encType="multipart/form-data">
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
                    {actionData?.errors?.name ? <p className="text-red-500 text-sm mt-1">{actionData.errors.name}</p> : null}
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
                    {actionData?.errors?.description ? <p className="text-red-500 text-sm mt-1">{actionData.errors.description}</p> : null}
                </div>
                <div>
                    <ComboboxCategories 
                        categories={categoryList.filter(category => category !== null) as string[]} 
                        error={actionData?.errors?.category}
                    />
                    {actionData?.errors?.category ? <p className="text-red-500 text-sm mt-1">{actionData.errors.category}</p> : null}
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
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-700">
                            Reference Images
                        </label>
                        <Button
                            type="button"
                            onClick={addImageInput}
                            variant="outline"
                            size="sm"
                        >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Image
                        </Button>
                    </div>

                    {imageInputs.map((input) => (
                        <div key={input.id} className="space-y-2 p-4 border rounded-md">
                            <div className="flex justify-between items-center">
                                <input
                                    type="file"
                                    name="images"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100"
                                />
                                {imageInputs.length > 1 && (
                                    <Button
                                        type="button"
                                        onClick={() => removeImageInput(input.id)}
                                        variant="ghost"
                                        size="sm"
                                    >
                                        <XMarkIcon className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                            <input
                                type="text"
                                name="captions"
                                placeholder="Image caption (optional)"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    ))}
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

                {actionData?.errors?._form ? <p className="text-red-500 text-center">{actionData.errors._form}</p> : null}
            </Form>
        </div>
    );
}