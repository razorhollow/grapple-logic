import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getTechnique } from "~/models/technique.server";
import { requireUserId } from "~/session.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const userId = await requireUserId(request);
    const techniqueId = parseInt(params.techniqueId ?? "0");
    const technique = await getTechnique({id:techniqueId, userId});

    if (!technique) {
        throw new Response("Technique not found", { status: 404 });
    }

    return { technique };
}

export default function PlanDetailsRoute() {
    const { technique } = useLoaderData<typeof loader>();
  return (
    <div className="mx-12 mt-10">
      <h1 className="font-bold">{technique.name}</h1>
      <p className="mt-4">{technique.description}</p>
    </div>
  );
}