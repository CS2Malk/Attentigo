import React from "react";
import { HowToUseGuide } from "@/lib/constants";

export default function HowToUse() {
  return (
    <section className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-2xl w-full border border-gray-200">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-green-600 drop-shadow-md">
          {HowToUseGuide.title}
        </h2>
        <ol className="space-y-8">
          {HowToUseGuide.steps.map((step) => (
            <li key={step.number} className="flex items-start">
              <span
                className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full font-bold mr-5 bg-${step.color}-500 text-white text-2xl shadow-md`}
                style={{ minWidth: '2.5rem', minHeight: '2.5rem' }}
              >
                {step.number}
              </span>
              <div>
                <span className="block text-2xl font-extrabold mb-1 text-gray-900">
                  {step.title}
                </span>
                <div
                  className="text-lg text-gray-600"
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex justify-center">
          <span className="bg-green-100 text-green-700 font-semibold rounded-full px-8 py-2 text-lg shadow-sm">
            {HowToUseGuide.tagline}
          </span>
        </div>
      </div>
    </section>
  );
}
