// Strapi API configuration and helper functions
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_PROD_URL;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_PROD_API_TOKEN;

// Helper function to make authenticated requests to Strapi
async function strapiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${STRAPI_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error('Strapi API request failed:', error);
    throw error;
  }
}

// Fetch all students
export async function getAllStudents(): Promise<any> {
  try {
    const response = await strapiRequest<any>('/api/students?populate=*');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch students:', error);
    throw new Error('Failed to fetch students from Strapi');
  }
}

// Authenticate student by email and password
export async function authenticateStudent(
  email: string, 
  password: string
): Promise<any | null> {
  try {
    // Fetch all students (in production, you might want to implement server-side filtering)
    const students = await getAllStudents();
    console.log('students', students);
    
    // Find student with matching email and password
    const authenticatedStudent = students.find(
      (student: any) => 
        student.Email.toLowerCase() === email.toLowerCase() && 
        student.Password.toLowerCase() === password.toLowerCase()
    );
    
    return authenticatedStudent || null;
  } catch (error) {
    console.error('Authentication failed:', error);
    throw new Error('Authentication failed');
  }
}

// Fetch student by ID
export async function getStudentById(id: number): Promise<any | null> {
  try {
    const response = await strapiRequest<any>(`/api/students/${id}?populate=school`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch student:', error);
    return null;
  }
}

// Fetch attendance records for a student
export async function getStudentAttendance(studentId: number): Promise<any> {
  try {
    const response = await strapiRequest<any>(
      `/api/attendances?filters[student][documentId][$eq]=${studentId}&populate=student&sort=Date:desc`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch attendance:', error);
    throw new Error('Failed to fetch attendance records');
  }
}

// Create attendance record
export async function createAttendanceRecord(
  studentId: any,
  date: string,
  attendanceMarked: boolean,
  timestamp: string,
  tardy: boolean = false
): Promise<any> {
  try {
    const response = await strapiRequest<any>('/api/attendances', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          student: studentId,
          Date: date,
          attendanceMarked: attendanceMarked,
          Timestamp: timestamp,
          tardy: tardy,
        },
      }),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create attendance record:', error);
    throw new Error('Failed to create attendance record');
  }
} 

// Fetch school by ID with location data
export async function getSchoolById(schoolId: number): Promise<any | null> {
  try {
    const response = await strapiRequest<any>(`/api/schools/${schoolId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch school:', error);
    throw new Error('Failed to fetch school data');
  }
}

// Fetch school data for a student (assuming student has school relation)
export async function getStudentSchool(studentId: number): Promise<any | null> {
  try {
    const student = await getStudentById(studentId);
    if (student && student.school) {
      return await getSchoolById(student.school.documentId);
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch student school:', error);
    throw new Error('Failed to fetch student school data');
  }
}

export async function verifyCurrentPassword(
  studentId: number,
  currentPassword: string
): Promise<boolean> {
  try {
    const student = await getStudentById(studentId);
    if (!student) {
      return false;
    }
    
    return student.Password.toLowerCase() === currentPassword.toLowerCase();
  } catch (error) {
    console.error('Failed to verify current password:', error);
    throw new Error('Failed to verify current password');
  }
}

export async function updateStudentPassword(
  studentId: number,
  newPassword: string
): Promise<any> {
  try {
    const response = await strapiRequest<any>(`/api/students/${studentId}`, {
      method: 'PUT',
      body: JSON.stringify({
        data: {
          Password: newPassword,
        },
      }),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update student password:', error);
    throw new Error('Failed to update student password');
  }
} 