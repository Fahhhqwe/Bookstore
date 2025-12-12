import Image from "next/image";
import BookCard from "@/components/BookCard";

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

export default async function BooksPage() {
    const res = await fetch("http://localhost:3000/api/books", {
        cache: "no-store",
    });

    const books: Book[] = await res.json();

    return (
        <div className="min-h-screen bg-gray-50 px-8 py-12">

            <h1 className="text-3xl font-bold mb-8 text-center">All Books</h1>

            {/* GRID LIST */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {books.map((book) => (
                    <BookCard key={book.bks_id} book={book} />
                ))}
            </div>
        </div>
    );
}
