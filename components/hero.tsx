import React from "react";
import { HeroSection } from "@/lib/constants";
import Link from "next/link";

const Hero = () => {
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link href="/login" passHref>
            <button className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors hover:cursor-pointer">
              {HeroSection.logIn}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
