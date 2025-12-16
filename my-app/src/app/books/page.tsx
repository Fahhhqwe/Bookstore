"use client";

import { useEffect, useState } from "react";
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
    ctg_name?: string;
}

export default function BooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch("/api/books", {
                    cache: "no-store",
                });

                if (!res.ok) throw new Error("Failed to fetch books");

                const data = await res.json();
                setBooks(data);
            } catch (err) {
                console.error("Error fetching books:", err);
                setError("Failed to load books");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 px-8 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">All Books</h1>

            {loading && (
                <p className="text-center text-gray-500">Loading books...</p>
            )}

            {error && (
                <p className="text-center text-red-500">{error}</p>
            )}

            {!loading && !error && books.length === 0 && (
                <p className="text-center text-gray-500">
                    No books available. Please try again later.
                </p>
            )}

            {!loading && !error && books.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {books.map((book) => (
                        <BookCard key={book.bks_id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
}
