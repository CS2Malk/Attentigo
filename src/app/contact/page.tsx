import Link from 'next/link';
import React from 'react';

export default function Contact() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-2">
        You can contact us via email this address...
      </p>
      <p className="mb-6">
        This page contains dynamic routes. You can try it out by clicking on the address bar and typing / at the end of the link along with any name you want.
      </p>

      <Link href="/">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go Back to Home
        </button>
      </Link>
    </div>
  );
}
