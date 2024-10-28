import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import { getTechnique } from "~/models/technique.server";
import { requireUserId } from "~/session.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const { techniqueId } = params;
    const userId = await requireUserId(request); 

    if (!techniqueId) {
    return new Response("Technique Id required", { status: 404 });
    }
    const technique = await getTechnique({ id: parseInt(techniqueId), userId });
    if (!technique) {
    return new Response("Technique not found", { status: 404 });
    }

    return json({ technique });
}

export default function TechniqueDetails() {
    const { technique } = useLoaderData<typeof loader>();
    return (
        <div>
            <Outlet context={{technique}}/>
        </div>
    );
}
