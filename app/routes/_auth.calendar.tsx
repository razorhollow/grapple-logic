import { Outlet, useNavigate } from "@remix-run/react";
import { useState } from "react";

import { Calendar } from "~/components/ui/calendar";


export default function CalendarRoute() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const navigate = useNavigate()

    const handleSelect = (newDate: Date | undefined) => {
        setDate(newDate)
        const formattedDate = newDate?.toISOString().split('T')[0]
        navigate(`/calendar/${formattedDate}`)
    }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
      <Calendar
        mode="single"
        required
        selected={date}
        onSelect={handleSelect}
        className="rounded-md border mx-auto mt-10"
      />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}