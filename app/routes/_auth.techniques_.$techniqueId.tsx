import { LoaderFunctionArgs } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";

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

    return technique;
}

export default function TechniqueDetails() {
    const technique = useLoaderData<typeof loader>();
    const formattedDate = new Date(technique.lastIntroduced).toLocaleDateString('en-US', { timeZone: 'UTC'});
    return (
        <div>
          <div className="px-4">
            <h3 className="text-base font-semibold leading-7 text-gray-900">{technique.name}</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Details and additional info.</p>
          </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Category</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{technique.category}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Description and Notes</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {technique.description ? technique.description : "No description available."} 
                </dd>
              </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Last Introduced</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{formattedDate}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Video Link</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{technique.videoLink ? <NavLink to={technique.videoLink}>{technique.videoLink}</NavLink> : "No Video Available"}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Study History</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{formattedDate}</dd>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 sm:col-start-2">{formattedDate}</dd>
              </div>
            </dl>
          </div>
        </div>
      )
}