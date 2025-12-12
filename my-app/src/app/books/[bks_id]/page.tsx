import { pool } from "@/app/lib/db";
import Image from "next/image";

export default async function BookDetail({ params }: any) {
    const id = Number(params.id);

    if (isNaN(id)) {
        return <p>Invalid book ID</p>;
    }

    const { rows } = await pool.query(
        `SELECT b.*, c.ctg_name
         FROM books b
         LEFT JOIN categories c ON b.bks_ctg_id = c.ctg_id
         WHERE b.bks_id = $1`,
        [id]
    );

    const book = rows[0];

    if (!book) {
        return <p>Book not found.</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex gap-6">
                <div className="relative w-64 h-96 rounded-xl overflow-hidden">
                    <Image
                        src={book.bks_url}
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
                            <span className="font-semibold">Category:</span> {book.ctg_name}
                        </p>

                        <p>
                            <span className="font-semibold">Year:</span> {book.bks_year}
                        </p>

                        <p className="text-xl font-semibold mt-4">
                            {book.bks_price} บาท
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
