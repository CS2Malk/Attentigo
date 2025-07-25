import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type AttendanceRecord = {
  date: string // ISO date string;
  attendance: boolean;
  tardy: boolean;
};

export type TableDisplayProps = {
  startDate?: Date;
  endDate?: Date;
  records?: AttendanceRecord[];
};



function isWithinRangeAndWeekday(dateStr: string, start?: Date, end?: Date) {
  const d = new Date(dateStr);
  if (start && d < start) return false;
  if (end && d > end) return false;
  // 0 = Sunday, 6 = Saturday
  if (d.getDay() === 0 || d.getDay() === 6) return false;
  return true;
}

export default function TableDisplay({ startDate, endDate, records = [] }: TableDisplayProps) {
  // const filtered = records.filter((r) => isWithinRangeAndWeekday(r.date, startDate, endDate));
  const getDayName = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { weekday: 'long' });
  };
  return (
    <Table>
      <TableCaption>A list of attendance records.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Attendance</TableHead>
          <TableHead>Tardy</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.filter(record => {
          const d = new Date(record.date);
          return d.getDay() !== 0 && d.getDay() !== 6;
        }).map((record, idx) => (
          <TableRow key={record.date + idx}>
            <TableCell>
              <div>{record.date}</div>
              <div className="text-xs text-muted-foreground">{getDayName(record.date)}</div>
            </TableCell>
            <TableCell>{record.attendance ? <span className="text-green-600">✔️</span> : "❌"}</TableCell>
            <TableCell>{record.tardy ? "Yes" : "No"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
