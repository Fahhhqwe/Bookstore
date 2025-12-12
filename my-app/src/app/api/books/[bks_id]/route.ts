import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/app/lib/db";

// ใช้ type ของ params ให้ตรงกับที่ Next.js ให้
export async function GET(
    request: NextRequest,
    context: { params: { bks_id: string } } // ไม่ต้องเป็น Promise
) {
    const id = Number(context.params.bks_id);

    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid book id" }, { status: 400 });
    }

    try {
        const { rows } = await pool.query("SELECT * FROM books WHERE bks_id = $1", [id]);
        const book = rows[0];

        if (!book) {
            return NextResponse.json({ error: "Book not found" }, { status: 404 });
        }

        return NextResponse.json(book);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
