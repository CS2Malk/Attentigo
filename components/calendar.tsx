"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

export default function CalendarDisplay() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2025, 5, 12))
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col items-center mt-20 mb-20">
      <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-md">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full mb-4">
            {open ? "Hide Calendar" : "Show Calendar"}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Calendar
            mode="single"
            defaultMonth={date}
            numberOfMonths={2}
            selected={date}
            onSelect={setDate}
            className="rounded-lg border shadow-sm justify-center"
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}