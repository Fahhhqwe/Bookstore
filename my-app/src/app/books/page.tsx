import BookCard from "@/components/BookCard";

export const dynamic = "force-dynamic";

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

export default async function BooksPage() {
    let books: Book[] = [];

    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL is not set");

        const res = await fetch(`${baseUrl}/api/books`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch books");

        books = await res.json();
    } catch (err) {
        console.error("Error fetching books:", err);
    }

    return (
        <div className="min-h-screen bg-gray-50 px-8 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">All Books</h1>

            {books.length === 0 ? (
                <p className="text-center text-gray-500">No books available. Please try again later.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {books.map((book) => (
                        <BookCard key={book.bks_id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
}
