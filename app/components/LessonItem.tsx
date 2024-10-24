import { VideoCameraIcon } from "@heroicons/react/24/outline"; // Optional: for better class concatenation
import clsx from "clsx";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface LessonItemProps {
  technique: {
    id: number;
    name: string;
    category: string;
    description: string | null;
    videoLink: string | null;
  };
  colorOption: "oneDay" | "oneWeek" | "twoWeeks" | "oneMonth" | "twoMonths" | "threeMonths";  // Add the colorOption prop
}

export default function LessonItem({ technique, colorOption }: LessonItemProps) {
  
  // Map the colorOption to the corresponding Tailwind class
  const colorClassMap = {
    oneDay: "bg-red-200",
    oneWeek: "bg-yellow-200",
    twoWeeks: "bg-green-300",
    oneMonth: "bg-green-200",
    twoMonths: "bg-gray-300",
    threeMonths: "bg-gray-200",
  };

  // Dynamically get the background class based on the passed colorOption
  const triggerBgClass = colorClassMap[colorOption];

  return (
    <Collapsible>
      <CollapsibleTrigger className={clsx(triggerBgClass, "rounded-lg p-2")}>
        <div className="grid grid-cols-2">
          <p>{technique.name}</p>
          <p className="inline-flex items-center rounded-full bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600">
            {technique.category}
          </p>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div>
            {technique.description}
            {technique.videoLink ? <a href="google.com" target="_blank" rel="noreferrer">
                <VideoCameraIcon className="h-5 w-5 p-5 border border-gray-300 inline-block" />
            </a> : null}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
