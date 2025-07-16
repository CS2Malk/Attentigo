"use client";

import React from 'react'
import { LoginForm } from "@/components/login-form";
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { student } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (student) {
      router.replace('/');
    }
  }, [student, router]);

  if (student) return null;

  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage
