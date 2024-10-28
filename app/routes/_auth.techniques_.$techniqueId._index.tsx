import { ChevronLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Technique } from "@prisma/client";
import { useOutletContext } from "@remix-run/react";
import { NavLink, useNavigate } from "react-router-dom";

import { Button } from "~/components/ui/button";

export default function TechniqueDetails() {
    const context = useOutletContext<{ technique: Pick<Technique, "name" | "category" | "lastIntroduced" | "description" | "videoLink" | "id" | "lastIntroduced"> }>();
    const { technique } = context;
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(-1);
    }

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
            </dl>
          </div>
          <div className="flex justify-center items-center gap-4">
            <Button variant="ghost"  onClick={handleClick}>
              <ChevronLeftIcon height={16}/>
            </Button>
            <Button variant="outline" asChild>
                <NavLink to={`/techniques/${technique.id}/edit`}><span className="w-12 flex gap-2"><PencilIcon height={16}/>Edit</span></NavLink>
            </Button>
          </div>
        </div>
      )
}