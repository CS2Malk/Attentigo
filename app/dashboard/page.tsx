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
import { getStudentAttendance } from "@/lib/strapi";

const DashboardPage = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [entries, setEntries] = useState<AttendanceRecord[]>([]);
  const { student, isLoading } = useAuth();
  const router = useRouter();
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transformAttendanceData = (
    attendanceData: any[]
  ): AttendanceRecord[] => {
    return attendanceData.map((record) => ({
      date: record.Date,
      attendance: record.attendanceMarked || false,
      tardy: record.tardy || false,
    }));
  };

  const filterRecordsByDateRange = (
    records: AttendanceRecord[],
    start?: Date,
    end?: Date
  ): AttendanceRecord[] => {
    if (!start || !end) return records;
    const result: AttendanceRecord[] = [];
    const dateToRecord: Record<string, AttendanceRecord> = {};
    records.forEach((rec) => {
      dateToRecord[rec.date] = rec;
    });
    const current = new Date(start);
    current.setHours(0, 0, 0, 0);
    const endDate = new Date(end);
    endDate.setHours(0, 0, 0, 0);
    while (current <= endDate) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) {
        const yyyy = current.getFullYear();
        const mm = String(current.getMonth() + 1).padStart(2, "0");
        const dd = String(current.getDate()).padStart(2, "0");
        const dateStr = `${yyyy}-${mm}-${dd}`;
        if (dateToRecord[dateStr]) {
          result.push(dateToRecord[dateStr]);
        } else {
          result.push({ date: dateStr, attendance: false, tardy: false });
        }
      }
      current.setDate(current.getDate() + 1);
    }
    return result;
  };

  const fetchAttendanceRecords = React.useCallback(async () => {
    // @ts-ignore
    if (!student?.documentId) {
      return;
    }
    setAttendanceLoading(true);
    setError(null);
    try {
      // @ts-ignore
      const attendanceData = await getStudentAttendance(student?.documentId);
      const transformedData = transformAttendanceData(attendanceData);
      setEntries(transformedData);
    } catch (error) {
      console.error("Failed to fetch attendance records:", error);
      setError("Failed to fetch attendance records. Please try again.");
      setEntries([]);
    } finally {
      setAttendanceLoading(false);
    }
  }, [student]);

  React.useEffect(() => {
    if (!isLoading && !student) {
      router.replace("/");
      return;
    }
    if (student) {
      fetchAttendanceRecords();
    }
  }, [student, isLoading, router, fetchAttendanceRecords]);

  const filteredEntries: AttendanceRecord[] = filterRecordsByDateRange(
    entries,
    startDate,
    endDate
  );
  const hasEntries = filteredEntries.length > 0;
  const showDateRangeFilter = startDate && endDate && startDate <= endDate;
  // console.log("Show date range filter:", showDateRangeFilter);
  // console.log("Has entries:", hasEntries);
  const handleReset = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    // setEntries([]);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="ml-2 text-gray-600">Checking authentication...</span>
      </div>
    );
  }
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
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-800 rounded-lg">
          {error}
        </div>
      )}
      {attendanceLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-2 text-gray-600">
            Loading attendance records...
          </span>
        </div>
      )}
      {!attendanceLoading && (
        <>
          {showDateRangeFilter && hasEntries ? (
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-col sm:flex-row gap-y-8 sm:gap-y-0 sm:gap-x-10 w-full items-center justify-center mb-8">
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
              <Button
                variant="destructive"
                className="mt-4 mb-12 w-48 h-12 text-base bg-green-500 hover:bg-green-600"
                onClick={handleReset}
                type="button"
              >
                Reset Calendars
              </Button>
              <div className="w-full overflow-x-auto">
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-700 mt-7">
                  Selected Attendance Records
                </h3>
                <TableDisplay records={filteredEntries} />
              </div>
            </div>
          ) : showDateRangeFilter && !hasEntries ? (
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-col sm:flex-row gap-y-8 sm:gap-y-0 sm:gap-x-10 w-full items-center justify-center mb-8">
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
              <Button
                variant="destructive"
                className="mt-4 mb-12 w-48 h-12 text-base bg-green-500 hover:bg-green-600"
                onClick={handleReset}
                type="button"
              >
                Reset Calendars
              </Button>
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg w-full max-w-md text-center mt-7">
                <p className="text-sm mt-2">
                  No attendance records are available for the selected date
                  range.
                </p>
              </div>
              {entries.length > 0 && (
                <div className="w-full overflow-x-auto">
                  <h3 className="text-xl font-semibold text-center mb-4 text-gray-700 mt-7">
                    All Attendance Records
                  </h3>
                  <TableDisplay records={filteredEntries} />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-col sm:flex-row gap-y-8 sm:gap-y-0 sm:gap-x-10 w-full items-center justify-center mb-8">
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
              <Button
                variant="destructive"
                className="mt-4 w-48 h-12 text-base bg-green-500 hover:bg-green-600 mb-12"
                onClick={handleReset}
                type="button"
              >
                Reset Calendars
              </Button>
              {entries.length === 0 && !error && (
                <div className="text-center py-8">
                  <p className="text-gray-600 text-lg">
                    No attendance records found.
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Start marking your attendance to see records here.
                  </p>
                </div>
              )}
              <div className="w-full overflow-x-auto pt-7">
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-700">
                  All Attendance Records
                </h3>
                <TableDisplay records={entries} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardPage;
