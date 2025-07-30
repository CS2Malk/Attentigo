'use client';

import React from "react";
import Link from "next/link";
import { NavItems } from "@/lib/constants";
import { Title } from "@/lib/constants";
import { AlignJustify, LogOut, User } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { Button } from "./ui/button";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import NavbarDropdown from "@/components/dropdown";

const Navbar = () => {
  const { student, logout } = useAuth() as { student: any; logout: () => void };
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-green-600">
              {Title.title}
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {NavItems.slice(0, 2).map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Student Info and Logout */}
            {student && (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>{student?.FirstName}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
                <NavbarDropdown></NavbarDropdown>
              </div>
            )}
          </nav>

          {/* Mobile Nav with Sheet */}
          <div className="flex items-center space-x-2 md:hidden">
            {student && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <button aria-label="Open menu">
                  <AlignJustify className="hover:cursor-pointer" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-2/3 max-w-xs">
                <nav className="flex flex-col space-y-4 mt-8 pl-7">
                  {student && (
                    <div className="mb-4 pb-4 border-b border-gray-200">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span>{student?.FirstName}</span>
                      </div>
                    </div>
                  )}
                  {NavItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="text-gray-700 hover:text-green-600 transition-colors text-lg"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

//

export default Navbar;
