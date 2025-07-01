import React from "react";
import { Button } from "@/components/ui/button";
import { ContactPageConstants } from "@/lib/constants";

const ContactForm = () => {
  return (
    <section className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-2xl w-full border border-gray-200">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-green-600 drop-shadow-md">
          {ContactPageConstants.heading}
        </h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              {ContactPageConstants.nameLabel}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              placeholder={ContactPageConstants.namePlaceholder}
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              {ContactPageConstants.emailLabel}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              placeholder={ContactPageConstants.emailPlaceholder}
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              {ContactPageConstants.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              placeholder={ContactPageConstants.messagePlaceholder}
              required
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full md:w-auto px-8 py-2 text-lg font-semibold hover:cursor-pointer"
            >
              {ContactPageConstants.buttonText}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
