import Image from "next/image";

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

export default async function BookDetail({ params }: { params: { id: string } }) {
    let book: Book | null = null;

    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL is not set");

        const res = await fetch(`/api/books/${params.id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch book");

        book = await res.json();
    } catch (err) {
        console.error("Error fetching book:", err);
    }

    if (!book) return <p className="text-center mt-8">Book not found.</p>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex gap-6">
                <div className="relative w-64 h-96 rounded-xl overflow-hidden">
                    <Image src={book.bks_url} alt={book.bks_name} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{book.bks_name}</h1>
                        <p className="text-gray-600 mt-2 text-lg">{book.bks_author}</p>
                        <p className="mt-4">
                            <span className="font-semibold">Category:</span> {book.ctg_name}
                        </p>
                        <p>
                            <span className="font-semibold">Year:</span> {book.bks_year}
                        </p>
                        <p className="text-xl font-semibold mt-4">{book.bks_price} บาท</p>
                        <p className="mt-4">{book.bks_description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
