import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>Home Page</h1>

      <Link
        href="/about-us"
        className="px-4 py-2 bg-blue-200 text-white rounded hover:bg-blue-400 inline-block text-center"
      >
        Go to About Us
      </Link>

      <Link
        href="/contact"
        className="px-4 py-2 bg-blue-200 text-white rounded hover:bg-blue-400 inline-block text-center"
      >
        Go to Contact
      </Link>

      <Link
        href="/practice"
        className="px-4 py-2 bg-blue-200 text-white rounded hover:bg-blue-400 inline-block text-center"
      >
        Go to Practice
      </Link>
    </main>
  );
}
