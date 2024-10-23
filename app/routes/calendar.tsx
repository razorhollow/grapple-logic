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
    <div className="w-full flex flex-col  justify-center items-center gap-10 md:flex-row md:items-center">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleSelect}
        className="rounded-md border mx-auto mt-10"
      />
      <div className="mx-auto">
      <Outlet />
      </div>
    </div>
  );
}