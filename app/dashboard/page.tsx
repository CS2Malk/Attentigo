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

const transformAttendanceData = (strapiData: any[]): AttendanceRecord[] => {
  return strapiData.map((record: any) => ({
    date: record.Date,
    attendance: record.attendanceMarked || false,
    tardy: record.tardy || false,
  }));
};

const DashboardPage = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [entries, setEntries] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { student } = useAuth();
  const router = useRouter();

  const filterRecordsByDateRange = (records: AttendanceRecord[], start?: Date, end?: Date): AttendanceRecord[] => {
    if (!start || !end) return records;
    
    // Convert to local date strings to avoid timezone issues
    const startStr = start.getFullYear() + '-' + 
                     String(start.getMonth() + 1).padStart(2, '0') + '-' + 
                     String(start.getDate()).padStart(2, '0');
    const endStr = end.getFullYear() + '-' + 
                   String(end.getMonth() + 1).padStart(2, '0') + '-' + 
                   String(end.getDate()).padStart(2, '0');
    
    return records.filter((record) => {
      const recordDateStr = record.date; // in YYYY-MM-DD format
      
      // Compare date strings for filtering
      const isInRange = recordDateStr >= startStr && recordDateStr <= endStr;
      
      // Check if it's a weekday 
      const recordDate = new Date(record.date + 'T00:00:00'); // Add time to avoid timezone shift
      const isWeekday = recordDate.getDay() !== 0 && recordDate.getDay() !== 6; // 0 = Sunday, 6 = Saturday
      
      return isInRange && isWeekday;
    });
  };

  // Fetch attendance records from Strapi
  const fetchAttendanceRecords = React.useCallback(async () => {
    // @ts-ignore
    if (!student?.documentId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {// @ts-ignore
      const strapiAttendanceData = await getStudentAttendance(student.documentId);
      const transformedData = transformAttendanceData(strapiAttendanceData || []);
      setEntries(transformedData);
    } catch (err) {
      console.error('Failed to fetch attendance records:', err);
      setError('Failed to load attendance records. Please try again.');
      setEntries([]);
    } finally {
      setIsLoading(false);
    }
  }, [student]);

  React.useEffect(() => {
    if (!student) {
      router.replace("/");
      return;
    }
    
    fetchAttendanceRecords();
  }, [student, router, fetchAttendanceRecords]);

  const filteredEntries = filterRecordsByDateRange(entries, startDate, endDate);
  const hasEntries = filteredEntries.length > 0;
  const showDateRangeFilter = startDate && endDate && startDate <= endDate;

  const handleReset = () => {
    setStartDate(undefined);
    setEndDate(undefined);
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

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-2 text-gray-600">Loading attendance records...</span>
        </div>
      )}

      {!isLoading && (
        <>
          {showDateRangeFilter && hasEntries ? (
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
                  Reset Filter
                </Button>
              </div>
              <div className="flex-1 w-full overflow-x-auto">
                <TableDisplay
                  startDate={startDate}
                  endDate={endDate}
                  records={filteredEntries}
                />
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
                className="mb-6 w-48 h-12 text-base bg-green-500 hover:bg-green-600"
                onClick={handleReset}
                type="button"
                variant="destructive"
              >
                Reset Filter
              </Button>
              
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg w-full max-w-md text-center">
                <p className="text-sm mt-2">
                  No attendance records are available for the selected date range.
                </p>
              </div>
              
              {entries.length > 0 && (
                <div className="w-full overflow-x-auto">
                  <h3 className="text-xl font-semibold text-center mb-4 text-gray-700">
                    All Attendance Records
                  </h3>
                  <TableDisplay
                    records={entries}
                  />
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
              
              {entries.length > 0 && (
                <div className="w-full overflow-x-auto">
                  <h3 className="text-xl font-semibold text-center mb-4 text-gray-700">
                    All Attendance Records
                  </h3>
                  <TableDisplay
                    records={entries}
                  />
                </div>
              )}
              
              {entries.length === 0 && !error && (
                <div className="text-center py-8">
                  <p className="text-gray-600 text-lg">No attendance records found.</p>
                  <p className="text-gray-500 text-sm mt-2">Start marking your attendance to see records here.</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardPage;

// finalize table display
// verify mobile responsiveness
// learn about strapi cms on youtube
