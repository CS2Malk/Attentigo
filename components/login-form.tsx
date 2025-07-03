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

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // You can handle the form submission here (e.g., send to API)
    console.log(values);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h2 className="text-4xl font-bold text-center mb-8 text-green-600 drop-shadow-md">
          Log In
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg text-black">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@email.com"
                      type="email"
                      {...field}
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg text-black">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                      className="h-12 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                className="w-48 h-12 text-lg bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition hover:cursor-pointer"
              >
                Log In
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

// Design contact form using shadcn ui components. Make sure it is mobile responsive. Grammar and spelling are correct. Concise and clear.
