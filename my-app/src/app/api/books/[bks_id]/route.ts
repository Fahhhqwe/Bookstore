import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/app/lib/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = Number(params.id);

    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
    }

    try {
        const { rows } = await pool.query(
            `SELECT b.*, c.ctg_name
       FROM books b
       LEFT JOIN categories c ON b.bks_ctg_id = c.ctg_id
       WHERE b.bks_id = $1`,
            [id]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: "Book not found" }, { status: 404 });
        }

        return NextResponse.json(rows[0], { status: 200 });
    } catch (error) {
        console.error("Error fetching book:", error);
        return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
    }
}
