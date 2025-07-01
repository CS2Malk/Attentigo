import React from "react";
import Link from "next/link";
import { NavItems } from "@/lib/constants";
import { Title } from "@/lib/constants";
import { AlignJustify } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";

const Navbar = () => {
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
          <nav className="hidden md:flex space-x-8">
            {NavItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Nav with Sheet */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button aria-label="Open menu">
                  <AlignJustify className="hover:cursor-pointer" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-2/3 max-w-xs">
                <nav className="flex flex-col space-y-4 mt-8 pl-7">
                  {NavItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="text-gray-700 hover:text-green-600 transition-colors text-lg"
                    >
                      {item.name}
                    </a>
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

export default Navbar;
