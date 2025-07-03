


import { Button } from '@/components/ui/button';


const MarkAttendancePage = () => {
  const today = new Date().toLocaleDateString();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl font-bold mb-2">Mark Attendance</h1>
      <div className="text-lg text-gray-700">Date: <span className="font-semibold">{today}</span></div>
      <Button
        className="px-6 py-2 rounded-lg font-semibold text-white transition-colors bg-green-500 hover:bg-green-700 hover:cursor-pointer"
      >
        Mark Attendance
      </Button>
    </div>
  );
};

export default MarkAttendancePage;
