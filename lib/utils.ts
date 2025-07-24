import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Calculate distance between two coordinates using Haversine formula
// Returns distance in meters
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // in meters
  return distance;
}

// Check if a location is within a specified radius of a target location
export function isWithinRadius(
  currentLat: number,
  currentLon: number,
  targetLat: number,
  targetLon: number,
  radiusInMeters: number
): boolean {
  const distance = calculateDistance(
    currentLat,
    currentLon,
    targetLat,
    targetLon
  );
  return distance <= radiusInMeters;
}

// export function isAttendanceTardy(
//   schoolStartTime: string,
//   schoolEndTime: string
// ): boolean {
//   const now = new Date();
//   const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
//   if (currentTime > schoolStartTime) {
//     return true;
//   }
//   return false;
// }

export function timeToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

export function checkAttendanceStatus(
  schoolStartTime: string,
): { onTime: boolean; istardy: boolean } {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
  const currentMinutes = timeToMinutes(currentTime);
  const startMinutes = timeToMinutes(schoolStartTime);
  const isOnTime = currentMinutes <= startMinutes;
  const isTardy = currentMinutes > startMinutes;
  return { onTime: isOnTime, istardy: isTardy };
}
