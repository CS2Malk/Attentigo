'use client';

import React from "react";
import { HeroSection } from "@/lib/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { User } from "lucide-react";

const Hero = () => {
  const { student, isLoading } = useAuth() as { student: any; isLoading: boolean };

  return (
    <section className="flex flex-col items-center justify-center w-full mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          {HeroSection.title1}
          <span className="text-green-500"> {HeroSection.title2} </span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          {HeroSection.description}
        </p>
        
        {/* Conditional welcome message for logged-in users */}
        {student && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-800 font-medium">
              Welcome back, {student?.FirstName}! 
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isLoading ? (
            <Button disabled className="bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold">
              Loading...
            </Button>
          ) : student ? (
            <Link href="/dashboard" passHref>
              <Button className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors hover:cursor-pointer flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Go to Dashboard</span>
              </Button>
            </Link>
          ) : (
            <Link href="/login" passHref>
              <Button className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors hover:cursor-pointer">
                {HeroSection.logIn}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;