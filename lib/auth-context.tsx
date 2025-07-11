'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authenticateStudent } from '@/lib/strapi';

interface AuthContextType {
  student: null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [student, setStudent] = useState<null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedStudent = localStorage.getItem('attentigo_student');
    if (savedStudent) {
      try {
        setStudent(JSON.parse(savedStudent));
      } catch (error) {
        console.error('Failed to parse saved student data:', error);
        localStorage.removeItem('attentigo_student');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const authenticatedStudent = await authenticateStudent(email, password);
      
      if (authenticatedStudent) {
        setStudent(authenticatedStudent);
        // Save to localStorage for persistence
        localStorage.setItem('attentigo_student', JSON.stringify(authenticatedStudent));
        setIsLoading(false);
        return true;
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setStudent(null);
    setError(null);
    localStorage.removeItem('attentigo_student');
  };

  const value = {
    student,
    login,
    logout,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 