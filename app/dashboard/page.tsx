import React from 'react'
import { CalendarDisplay } from "@/components/calendar"
import TableDisplay from '@/components/table';

const DashboardPage = () => {
  return (
    <div className="flex-col pt-15 pb-20">
      <div className="flex gap-x-10">
    <CalendarDisplay title="Start Date"/>
    <CalendarDisplay title="End Date" />
      </div>
    <div className="mt-10">
    <TableDisplay/>
    </div>
    </div>
  )
};

export default DashboardPage

// finalize table display
// verify mobile responsiveness
// learn about strapi cms on youtube
