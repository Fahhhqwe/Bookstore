import Link from "next/link";
import Image from "next/image";
import FeaturedBookCard from "@/components/FeatureBookCard";

interface Book {
  bks_id: number;
  bks_name: string;
  bks_author: string;
  bks_publisher: string;
  bks_year: number;
  bks_description: string;
  bks_price: number;
  bks_url: string;
}

export default async function HomePage() {
  const res = await fetch("http://localhost:3000/api/books", {
    cache: "no-store",
  });
  const books: Book[] = await res.json();

  const featured = books.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to FAH Bookstore</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Discover your next great read — explore our collection of books across
          all genres, from timeless classics to modern bestsellers.
        </p>
      </section>

      {/* FEATURED BOOKS */}
      <section className="px-8 py-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Books</h2>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {featured.map((book) => (
            <FeaturedBookCard key={book.bks_id} book={book} />
          ))}

          <Link
            href="/books"
            className="w-[300px] h-[430px] rounded-lg shadow-lg overflow-hidden flex-shrink-0 relative flex items-center justify-center group transition-all"
          >
            <div
              className="absolute inset-0 bg-cover bg-center brightness-90 group-hover:brightness-100 transition-all duration-300"
              style={{ backgroundImage: "url('/bg-books.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/60 via-indigo-700/60 to-indigo-900/70 
        group-hover:from-indigo-600/70 group-hover:via-blue-700/70 group-hover:to-blue-900/70
        transition-all duration-300" />
            <div className="relative z-10 text-center text-white px-4">
              <span className="text-xl font-bold drop-shadow-md">Browse All Books</span>
            </div>
          </Link>
        </div>

      </section>
    </div>
  );
}
