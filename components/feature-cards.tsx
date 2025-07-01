import React from "react";
import { Cards } from "@/lib/constants";
import DynamicIcon from "./dynamicIcon";

const FeatureCards = () => {
  return (
    <div>
      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {Cards.map((card, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${card.backgroundColor} p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">`}
          >
            <div
              className={`w-16 h-16 ${card.iconBackgroundColor} rounded-lg flex items-center justify-center mb-6`}
            >
              <DynamicIcon
                iconName={card.iconName as keyof typeof import("lucide-react")}
                size={24}
                color="white"
              />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">
              {card.title}
            </h4>
            <p className="text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
