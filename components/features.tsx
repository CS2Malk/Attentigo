import React from "react";
import FeatureCards from "@/components/feature-cards";
import { FeaturesIntro } from "@/lib/constants";

const Features = () => {
  return (
    <section id="features" className="bg-white mt-40 mb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">{ FeaturesIntro.title }</h3>
        </div>
      </div>
      <FeatureCards />
    </section>
  );
};

export default Features;
