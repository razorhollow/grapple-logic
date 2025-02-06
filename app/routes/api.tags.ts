import { ActionFunctionArgs, json } from "@remix-run/node";
import { createTag } from "~/models/technique.server";
import { requireUserId } from "~/session.server";

export async function action({ request }: ActionFunctionArgs) {
    await requireUserId(request);

    if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, { status: 405 });
    }

    const { name } = await request.json();

    if (typeof name !== "string" || name.trim() === "") {
        return json({ error: "Tag name is required" }, { status: 400 });
    }

    try {
        const tag = await createTag(name.trim());
        return json(tag);
    } catch (error) {
        // Handle unique constraint violation
        if (error.code === 'P2002') {
            return json({ error: "Tag already exists" }, { status: 400 });
        }
        return json({ error: "Something went wrong" }, { status: 500 });
    }
} 