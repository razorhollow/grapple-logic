import { PlusIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ActionFunctionArgs, LoaderFunctionArgs, redirect, json } from '@remix-run/node';
import { useLoaderData, Form, useActionData, useNavigation } from '@remix-run/react';
import { useState } from 'react';
import { toast } from 'sonner';

import ComboboxCategories from '~/components/ComboBox';
import { Button } from '~/components/ui/button';
import { prisma } from '~/db.server';
import { getCategories, getTags } from '~/models/technique.server';
import { uploadToCloudinary } from '~/utils/cloudinary.server';

export async function loader({ params }: LoaderFunctionArgs) {
    const technique = await prisma.technique.findUnique({
        where: { id: Number(params.techniqueId) },
        include: { 
            tags: true,
            references: {
                orderBy: {
                    createdAt: 'asc'
                }
            }
        },
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
    const deleteImageId = formData.get('deleteImageId');

    // Handle image deletion
    if (deleteImageId) {
        await prisma.techniqueReference.delete({
            where: { id: deleteImageId as string }
        });
        return json({ success: true });
    }

    const name = formData.get('name');
    const description = formData.get('description') as string | null;
    const category = formData.get('category') as string | null;
    const videoLink = formData.get('videoLink') as string | null;
    const lastIntroduced = new Date(formData.get('lastIntroduced') as string) || new Date();
    const tagIds = formData.getAll('tagIds') as string[];
    
    // Get all images and captions
    const images = formData.getAll('images') as File[];
    const captions = formData.getAll('captions') as string[];

    if (typeof name !== 'string' || name.trim() === '') {
        return { error: 'Technique name is required' };
    }

    if (intent === 'save') {
        try {
            // Update technique first
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

            // Handle new image uploads
            const imagePromises = images
                .filter(image => image.size > 0) // Filter out empty file inputs
                .map(async (image, index) => {
                    const imageUrl = await uploadToCloudinary(image);
                    return prisma.techniqueReference.create({
                        data: {
                            techniqueId: Number(params.techniqueId),
                            imageUrl,
                            caption: captions[index] || null
                        }
                    });
                });

            await Promise.all(imagePromises);

            return redirect('/techniques');
        } catch (error) {
            console.error('Error updating technique:', error);
            return json(
                { error: "Failed to update technique" },
                { status: 500 }
            );
        }
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
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const [newTagName, setNewTagName] = useState('');
    const [isCreatingTag, setIsCreatingTag] = useState(false);
    const [imageInputs, setImageInputs] = useState([{ id: 0 }]);

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

            toast.success('Tag created successfully');
            setNewTagName('');
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
            <h1 className="text-xl font-bold mb-4">Edit Technique</h1>
            <Form method="post" className="space-y-4" encType="multipart/form-data">
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
                <ComboboxCategories 
                    categories={categoryList.filter(category => category !== null) as string[]} 
                    defaultValue={technique.category || ''}
                />
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
                        <div className="flex gap-2 mb-2 mt-1">
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

                    {technique.references.length > 0 ? <div className="space-y-4">
                            {technique.references.map((ref) => (
                                <div key={ref.id} className="relative rounded-lg overflow-hidden border border-gray-200">
                                    <img
                                        src={ref.imageUrl}
                                        alt={ref.caption || 'Technique reference'}
                                        className="w-full h-auto max-h-[400px] object-contain bg-gray-50"
                                    />
                                    {ref.caption ? <div className="p-2 bg-gray-50 border-t border-gray-200">
                                            <p className="text-sm text-gray-600">{ref.caption}</p>
                                        </div> : null}
                                    <Button
                                        type="submit"
                                        name="deleteImageId"
                                        value={ref.id}
                                        variant="ghost"
                                        size="sm"
                                        className="absolute top-2 right-2 bg-white/80 hover:bg-white/90"
                                    >
                                        <TrashIcon className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                        </div> : null}

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
                                {imageInputs.length > 1 ? <Button
                                        type="button"
                                        onClick={() => removeImageInput(input.id)}
                                        variant="ghost"
                                        size="sm"
                                    >
                                        <XMarkIcon className="h-4 w-4" />
                                    </Button> : null}
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
                {actionData?.error ? <p className="text-red-500">{actionData.error}</p> : null}
                <Button
                    variant="default"
                    name='intent'
                    value='save'
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting && navigation.formData?.get('intent') === 'save' 
                        ? 'Updating...' 
                        : 'Update Technique'
                    }
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
