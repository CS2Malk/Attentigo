"use client";
import React, { useState } from "react";
import { CalendarDisplay } from "@/components/calendar";
import TableDisplay from "@/components/table";
import type { AttendanceRecord } from "@/components/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [entries, setEntries] = useState<AttendanceRecord[]>([]);
  const { student } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!student) {
      router.replace("/");
      return;
    }
    if (startDate && endDate && startDate <= endDate) {
      // Generate entries for each day in the range
      const result: AttendanceRecord[] = [];
      let d = new Date(startDate);
      while (d <= endDate) {
        result.push({
          date: d.toISOString().slice(0, 10),
          attendance: false,
          tardy: false,
        });
        d = new Date(d);
        d.setDate(d.getDate() + 1);
      }
      setEntries(result);
    } else {
      setEntries([]);
    }
  }, [student, startDate, endDate, router]);

  const hasEntries = entries.length > 0;
  const handleReset = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setEntries([]);
  };

  if (!student) return null;

  return (
    <div className="pt-15 pb-20 w-full max-w-5xl mx-auto px-2">
      <div className="mb-8 flex justify-center">
        <Link href="/mark-attendance">
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 shadow-lg">
            <CheckCircle className="h-5 w-5" />
            <span>{`Mark Today's Attendance`}</span>
          </Button>
        </Link>
      </div>
      {hasEntries ? (
        <div className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 md:gap-x-10 items-start justify-center w-full">
          <div className="flex flex-col min-w-[220px] space-y-8 mt-18 items-center w-full md:w-auto">
            <CalendarDisplay
              title="Start Date"
              onChange={setStartDate}
              value={startDate}
            />
            <CalendarDisplay
              title="End Date"
              onChange={setEndDate}
              value={endDate}
            />
            <Button
              className="mt-4 w-48 h-12 text-base bg-green-500 hover:bg-green-600"
              onClick={handleReset}
              type="button"
              variant="destructive"
            >
              Reset Table
            </Button>
          </div>
          <div className="flex-1 w-full overflow-x-auto">
            <TableDisplay
              startDate={startDate}
              endDate={endDate}
              records={entries}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col sm:flex-row gap-y-8 sm:gap-y-0 sm:gap-x-10 w-full items-center justify-center">
            <CalendarDisplay
              title="Start Date"
              onChange={setStartDate}
              value={startDate}
            />
            <CalendarDisplay
              title="End Date"
              onChange={setEndDate}
              value={endDate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;

// finalize table display
// verify mobile responsiveness
// learn about strapi cms on youtube
