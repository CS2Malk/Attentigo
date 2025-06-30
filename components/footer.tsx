import React from "react";
import { FooterSection } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="py-8 border-t">
        <div className="max-w-7xl mx-auto sm:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h5 className="text-xl font-bold mb-4 text-green-600">
                { FooterSection.title }
              </h5>
              <div className="text-gray-400 mb-4">
                <p>
                  { FooterSection.contact }
                </p>
                <p>
                  { FooterSection.phone }
                </p>
                <p>
                  { FooterSection.termsOfService }
                </p>
                <p>
                  { FooterSection.privacyPolicy }
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
