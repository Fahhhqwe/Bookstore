import Image from "next/image";

export const dynamic = "force-dynamic"; // บังคับ server-side dynamic

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

export default async function BookDetail({ params }: { params: { id: string } }) {
    const id = Number(params.id);

    if (isNaN(id)) {
        return <p className="text-center text-red-500">Invalid book ID</p>;
    }

    let book: Book | null = null;

    try {
        // ใช้ relative path แทน localhost
        const res = await fetch(`/api/books/${id}`, { cache: "no-store" });

        if (!res.ok) throw new Error("Failed to fetch book details");

        book = await res.json();
    } catch (error) {
        console.error("Error fetching book details:", error);
    }

    if (!book) {
        return <p className="text-center text-gray-500">Book not found.</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-64 h-96 rounded-xl overflow-hidden">
                    <Image
                        src={book.bks_url || "/placeholder.jpg"} // fallback image
                        alt={book.bks_name}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{book.bks_name}</h1>
                        <p className="text-gray-600 mt-2 text-lg">{book.bks_author}</p>

                        <p className="mt-4">
                            <span className="font-semibold">Category:</span> {book.ctg_name || "Unknown"}
                        </p>

                        <p>
                            <span className="font-semibold">Year:</span> {book.bks_year}
                        </p>

                        <p className="text-xl font-semibold mt-4">
                            {book.bks_price} บาท
                        </p>

                        <p className="mt-4 text-gray-700">{book.bks_description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
