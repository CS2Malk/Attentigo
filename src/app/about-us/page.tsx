import Link from 'next/link';
import React from 'react';

export default function AboutUs() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-2">
        We are a team of passionate developers dedicated to building amazing web applications.
      </p>
      <p className="mb-6">
        Our mission is to create user-friendly and efficient software solutions that make a difference.
      </p>

      <Link href="/" className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Go Back to Home
      </Link>
    </div>
  );
}
