import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const { techniqueId } = params;
    const userId = await requireUserId(request); 

    if (!techniqueId) {
        throw new Response("Technique Id required", { status: 404 });
    }

    const technique = await prisma.technique.findUnique({
        where: { 
            id: parseInt(techniqueId),
            userId 
        },
        include: {
            tags: true,
            references: {
                orderBy: {
                    createdAt: 'asc'
                }
            }
        }
    });

    if (!technique) {
        throw new Response("Technique not found", { status: 404 });
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
