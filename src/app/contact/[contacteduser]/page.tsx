import Link from 'next/link';

export default function UserPage({ params }: { params: { contacteduser: string } }) {
  const { contacteduser } = params;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hello, {contacteduser}!</h1>
      <p>This is a dynamic user page.</p>
      <div className = "flex"><Link href="/">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go Back to Home
        </button>
      </Link>
      <Link href="/contact">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go Back to Home
        </button>
      </Link>
        </div>
    </main>
  );
}
