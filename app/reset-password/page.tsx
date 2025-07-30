"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { verifyCurrentPassword, updateStudentPassword } from "@/lib/strapi";

const formSchema = z
  .object({
    currentPassword: z.string().min(1, { message: "Current password is required" }),
    newPassword: z.string().min(6, { message: "New password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { message: "Please confirm your new password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { student, isLoading, logout } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!student) {
      setError("No authenticated user found");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const isCurrentPasswordValid = await verifyCurrentPassword(
        //@ts-ignore
        student.documentId,
        values.currentPassword
      );

      if (!isCurrentPasswordValid) {
        setError("Current password is incorrect");
        setIsSubmitting(false);
        return;
      }
      //@ts-ignore
      await updateStudentPassword(student.documentId, values.newPassword);

      setSuccess(true);

      setTimeout(() => {
        logout();
        router.replace("/");
      }, 2000);

    } catch (error) {
      console.error("Password reset failed:", error);
      setError(error instanceof Error ? error.message : "Failed to reset password");
      setIsSubmitting(false);
    }
  }

  React.useEffect(() => {
    if (!isLoading && !student) {
      router.replace("/");
    }
  }, [student, isLoading, router]);

  if (success) {
    return (
      <div className="flex justify-center items-center py-20 bg-transparent">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
          <h2 className="text-4xl font-bold mb-6 text-green-600 drop-shadow-sm">
            Password Reset Successful!
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Your password has been updated successfully.
          </p>
          <p className="text-md text-gray-500">
            You will be redirected to the login page in a moment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-20 bg-transparent">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h2 className="text-4xl font-bold text-center mb-8 text-green-600 drop-shadow-sm">
          Reset Password
        </h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-center font-medium">{error}</p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg text-black">Current Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your current password"
                      {...field}
                      className="h-12"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg text-black">New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your new password"
                      {...field}
                      className="h-12"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg text-black">Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your new password"
                      {...field}
                      className="h-12"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-48 h-12 text-lg bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition hover:cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

