"use client";

import React, { useState } from "react";
// Define Student type
type Student = any;
import Link from "next/link";
import { MarkAttendanceConstants } from "@/lib/constants";
import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";
import { createAttendanceRecord, getStudentSchool } from "@/lib/strapi";
import { useRouter } from "next/navigation";
import { useGeolocation } from "@/lib/use-geolocation";
import { isWithinRadius, checkAttendanceStatus } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const MarkAttendancePage = () => {
  const today = new Date().toLocaleDateString();
  // Type student as Student | null
  const { student } = useAuth() as { student: Student | null };
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);
  const [schoolData, setSchoolData] = useState<any>(null);
  const [isLocationVerified, setIsLocationVerified] = useState(false);
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);

  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 60000, // 1 minute
  });

  // Fetch school data when component mounts
  useEffect(() => {
    const fetchSchoolData = async () => {
      // @ts-ignore
      if (student && student.documentId) {
        try {
          // @ts-ignore
          const school = await getStudentSchool(student.documentId);
          console.log("school", school);
          setSchoolData(school);
        } catch (error) {
          console.error("Failed to fetch school data:", error);
          setMessage({
            type: "error",
            text: "Failed to load school information. Please try again.",
          });
        }
      }
    };

    if (student) {
      fetchSchoolData();
    }
  }, [student]);

  const verifyLocation = async () => {
    if (!schoolData) {
      setMessage({
        type: "error",
        text: "School location data not available. Please try again.",
      });
      return;
    }

    if (!schoolData.Latitude || !schoolData.Longitude) {
      setMessage({
        type: "error",
        text: "School coordinates not configured. Please contact administration.",
      });
      return;
    }

    setIsCheckingLocation(true);
    setMessage({ type: "info", text: "Getting your location..." });

    geolocation.getCurrentPosition();
  };

  // Check location when geolocation data changes
  useEffect(() => {
    if (
      geolocation.latitude &&
      geolocation.longitude &&
      schoolData &&
      isCheckingLocation
    ) {
      const withinRadius = isWithinRadius(
        geolocation.latitude,
        geolocation.longitude,
        schoolData.Latitude,
        schoolData.Longitude,
        50 // 50 meters radius
        // fetch and create radius from strapi
      );

      if (withinRadius) {
        setIsLocationVerified(true);
        setMessage({
          type: "success",
          text: "Location verified! You can now mark attendance.",
        });
      } else {
        setIsLocationVerified(false);
        setMessage({
          type: "error",
          text: "You are not within 50 meters of the school. Please move closer to mark attendance.",
        });
      }
      setIsCheckingLocation(false);
    }
  }, [
    geolocation.latitude,
    geolocation.longitude,
    schoolData,
    isCheckingLocation,
  ]);

  // Handle geolocation errors
  useEffect(() => {
    if (geolocation.error && isCheckingLocation) {
      setMessage({
        type: "error",
        text: `Location error: ${geolocation.error}`,
      });
      setIsCheckingLocation(false);
      setIsLocationVerified(false);
    }
  }, [geolocation.error, isCheckingLocation]);

  const handleMarkAttendance = async () => {
    if (!student) {
      setMessage({ type: "error", text: "Please log in to mark attendance" });
      return;
    }

    if (!isLocationVerified) {
      setMessage({
        type: "error",
        text: "Please verify your location first before marking attendance.",
      });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const todayISO = new Date().toISOString().split("T")[0];
      const timestamp = new Date().toISOString();
      let isTardy = false;
      let attendanceMessage = "attendance marked successfully";
      if (schoolData && schoolData.startTime) {
        const { istardy: tardyStatus } = checkAttendanceStatus(
          schoolData.startTime
        );
        isTardy = tardyStatus;
        if (isTardy) {
          attendanceMessage = "Late attendance marked successfully";
        }
      }
      await createAttendanceRecord(
        student?.documentId,
        todayISO,
        true,
        timestamp,
        isTardy
      );

      setMessage({
        type: "success",
        text: `Attendance marked successfully!`,
      });

      // Redirect to dashboard after 1 seconds
      // setTimeout(() => {
      //   router.push("/dashboard");
      // }, 1000);
    } catch (error) {
      console.error("Failed to mark attendance:", error);
      setMessage({
        type: "error",
        text: "Failed to mark attendance. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-white/80 shadow-md rounded-3xl px-12 py-10 flex flex-col items-center gap-8 border">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-green-600">
          {MarkAttendanceConstants.Mark}
        </h1>
        <div className="flex items-center gap-2 text-lg sm:text-xl text-gray-700 bg-green-50 px-4 py-2 rounded-full shadow-inner">
          <span className="font-semibold text-green-500">{today}</span>
        </div>
        {schoolData && schoolData.startTime && (
          <div className="space-y-2 text-center">
            <div className="text-sm text-gray-600">
              <span className="font-medium">
                School starting time: {schoolData.startTime}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">
                Current time: {new Date().toTimeString().slice(0, 5)}
              </span>
            </div>
            {(() => {
              try {
                const { onTime, istardy } = checkAttendanceStatus(
                  schoolData.startTime
                );
                if (istardy) {
                  return (
                    <div className="text-sm text-orange-500">You are late.</div>
                  );
                } else if (onTime) {
                  return (
                    <div className="text-sm text-green-500">
                      You are on time.
                    </div>
                  );
                }
              } catch (error) {
                return (
                  <div className="text-sm text-red-500">
                    Something goes wrong.
                  </div>
                );
              }
            })()}
          </div>
        )}

        {/* Location Verification Section */}
        <div className="w-full max-w-md space-y-4">
          {!isLocationVerified && (
            <Button
              className="w-full px-8 py-3 rounded-xl font-bold text-white text-lg shadow-lg bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-200 ease-in-out hover:shadow-2xl"
              onClick={verifyLocation}
              disabled={isCheckingLocation || geolocation.loading}
            >
              {isCheckingLocation || geolocation.loading ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Verifying Location...
                </span>
              ) : (
                <span>Verify Location</span>
              )}
            </Button>
          )}

          {isLocationVerified && (
            <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg border border-green-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">Location Verified</span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <Button
            className={`px-8 py-3 rounded-xl font-bold text-white text-lg shadow-lg transition-all duration-200 ease-in-out hover:shadow-2xl hover:cursor-pointer w-full sm:w-auto ${
              isLocationVerified
                ? "bg-green-600 hover:bg-green-700 hover:scale-105"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleMarkAttendance}
            disabled={!isLocationVerified || isSubmitting}
          >
            <span className="flex items-center gap-2">
              {MarkAttendanceConstants.Mark}
            </span>
          </Button>
          <Link href="/dashboard" className="w-full sm:w-auto" passHref>
            <Button
              variant="outline"
              className="px-8 py-3 rounded-xl font-bold text-green-600 hover:cursor-pointer border-green-600 text-lg hover:bg-green-50 hover:text-green-700 w-full sm:w-auto"
            >
              {MarkAttendanceConstants.Dashboard}
            </Button>
          </Link>
        </div>
        {message && (
          <div
            className={`w-full max-w-md p-4 rounded-lg border ${
              message.type === "success"
                ? "bg-green-50 border-green-300 text-green-800"
                : message.type === "error"
                ? "bg-red-50 border-red-300 text-red-800"
                : "bg-blue-50 border-blue-300 text-blue-800"
            }`}
          >
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
