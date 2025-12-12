import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/app/lib/db";

export async function GET(req: NextRequest, { params }: { params: { bks_id: string } }) {
    const id = Number(params.bks_id);
    if (isNaN(id)) return NextResponse.json({ error: "Invalid book id" }, { status: 400 });

    try {
        const { rows } = await pool.query("SELECT * FROM books WHERE bks_id = $1", [id]);
        const book = rows[0];
        if (!book) return NextResponse.json({ error: "Book not found" }, { status: 404 });

        return NextResponse.json(book);
    } catch (err) {
        return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
}
