import { VideoCameraIcon } from "@heroicons/react/24/outline"; // Optional: for better class concatenation
import clsx from "clsx";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface LessonItemProps {
  technique: {
    id: number;
    name: string;
    category: string | null;
    description: string | null;
    videoLink: string | null;
    lastIntroduced: string;
  };
}

export default function LessonItem({ technique }: LessonItemProps) {
  
    const now = new Date();

    // Calculate the difference in days between lastStudied and now
    const daysSinceLastStudied = Math.floor((now.getTime() - new Date(technique.lastIntroduced).getTime()) / (1000 * 60 * 60 * 24));
  
    // Determine background class based on daysSinceLastStudied
    const getBackgroundClass = (days: number) => {
      if (days < 7) {
        return "bg-gray-200";       // Less than 7 days
      } else if (days < 14) {
        return "bg-blue-200";    // Less than 2 weeks
      } else if (days < 21) {
        return "bg-purple-200";     // Less than 3 weeks
      } else if (days <= 28) {
        return "bg-brown-200";     // Less than or equal to 4 weeks
      } else if (days <= 56) {
        return "bg-black text-white";      // Less than or equal to 8 weeks
      } else {
        return "bg-red-500 text-white";      // Greater than 8 weeks
      }
    };
  
    // Get the appropriate background class
    const triggerBgClass = getBackgroundClass(daysSinceLastStudied);
  

  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className={clsx(triggerBgClass, "rounded-lg p-2 w-full h-16")}>
        <div className="flex justify-between w-full">
          <p>{technique.name}</p>
          <p className="inline-flex items-center rounded-full bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600 w-32 text-center justify-center">
            {technique.category}
          </p>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="w-full">
        <div className="flex justify-around gap-4 items-center">
            <p>{technique.description}</p>
            {technique.videoLink ? <a href={technique.videoLink} target="_blank" rel="noreferrer">
                <VideoCameraIcon className="inline-block text-gray-400 rounded-lg" height="32" />
            </a> : null}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
