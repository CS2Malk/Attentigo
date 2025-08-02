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
import { updateStudentPassword, verifyCurrentPassword } from "@/lib/strapi";
import { fi } from "date-fns/locale";

const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(4, { message: "Current password must be at least 4 characters" }),
    newPassword: z
      .string()
      .min(4, { message: "New password must be at least 4 characters" }),
    confirmPassword: z
      .string()
      .min(4, { message: "Confirmed password must be at least 4 characters" }),
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
  debugger;
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!student) {
      setError("You must be logged in to reset your password");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const isCurrentPasswordValid = await verifyCurrentPassword(
        values.currentPassword,
        // @ts-ignore
        student?.id
      );
      if (!isCurrentPasswordValid) {
        setError("Invalid current password");
        setIsSubmitting(false);
        return;
      }
      // @ts-ignore
      await updateStudentPassword(values.newPassword, student?.id);
      setSuccess(true);
      setTimeout(() => {
        logout();
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Failed to reset password:", error);
      setError("Failed to reset password");
      setIsSubmitting(false);
    } finally {
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
        <div className="w-full bg-white text-center rounded-2xl shadow-sm p-8 md:p-12">
          <h2 className="text-4xl font-bold mb-6 text-green-600 drop-shadow-sm">
            Password Reset Successful
          </h2>
          <p className="text-md text-gray-600">
            Your password has been successfully reset. You will be redirected to the home page shortly.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center py-20 bg-transparent">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h2 className="text-4xl font-bold text-center mb-8 text-green-600 drop-shadow-sm">
          Reset Password
        </h2>
        {error && (
          <div className="text-center p-4 rounded-lg mb-6 border border-red-200">
            <p className="font-medium text-red-700 text-center">{error}</p>
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg text-black">
                    Current Password
                  </FormLabel>
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
                  <FormLabel className="font-semibold text-lg text-black">
                    New Password
                  </FormLabel>
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
                  <FormLabel className="font-semibold text-lg text-black">
                    Confirm New Password
                  </FormLabel>
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
                className="w-48 h-12 text-lg bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition hover:cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isSubmitting}
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
