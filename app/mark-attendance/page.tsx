"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MarkAttendanceConstants } from "@/lib/constants";
import { useAuth } from '@/lib/auth-context';
import { createAttendanceRecord } from '@/lib/strapi';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

const MarkAttendancePage = () => {
  const today = new Date().toLocaleDateString();
  const { student } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Redirect if logged in
  React.useEffect(() => {
    if (student) {
      router.replace('/');
    }
  }, [student, router]);

  const handleMarkAttendance = async () => {
    if (!student) {
      setMessage({ type: 'error', text: 'Please log in to mark attendance' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const todayISO = new Date().toISOString().split('T')[0];
      const timestamp = new Date().toISOString();
      await createAttendanceRecord(student.documentId, todayISO, true, timestamp);
      
      setMessage({
        type: 'success',
        text: `Attendance marked successfully!`
      });
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Failed to mark attendance:', error);
      setMessage({
        type: 'error',
        text: 'Failed to mark attendance. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (student) return null;

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
            onClick={() => handleMarkAttendance()}
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
        {message && (
          <div className={`w-full max-w-md p-4 rounded-lg border ${
            message.type === 'success' ? 'bg-green-50 border-green-300 text-green-800' :
            message.type === 'error' ? 'bg-red-50 border-red-300 text-red-800' :
            'bg-blue-50 border-blue-300 text-blue-800'
          }`}>
            <span>{message.text}</span>
          </div>
        )}
        {isSubmitting && (
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                <span>Marking attendance...</span>
              </div>
            )}
      </div>
    </div>
  );
};

export default MarkAttendancePage;
