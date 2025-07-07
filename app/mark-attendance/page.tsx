import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MarkAttendanceConstants } from "@/lib/constants";

const MarkAttendancePage = () => {
  const today = new Date().toLocaleDateString();
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-white/80 shadow-md rounded-3xl px-12 py-10 flex flex-col items-center gap-8 border">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-green-600">{ MarkAttendanceConstants.Mark }</h1>
        <div className="flex items-center gap-2 text-lg sm:text-xl text-gray-700 bg-green-50 px-4 py-2 rounded-full shadow-inner">
          <span className="font-semibold text-green-500">{today}</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <Button
            className="px-8 py-3 rounded-xl font-bold text-white text-lg shadow-lg bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-200 ease-in-out hover:shadow-2xl hover:cursor-pointer w-full sm:w-auto"
          >
            <span className="flex items-center gap-2">{ MarkAttendanceConstants.Mark }</span>
          </Button>
          <Link href="/dashboard" className="w-full sm:w-auto" passHref>
            <Button
              variant="outline"
              className="px-8 py-3 rounded-xl font-bold text-green-600 hover:cursor-pointer border-green-600 text-lg hover:bg-green-50 hover:text-green-700 w-full sm:w-auto"
            >
              { MarkAttendanceConstants.Dashboard }
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarkAttendancePage;
