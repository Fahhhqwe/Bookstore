import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/app/lib/db";

export async function GET(
    req: NextRequest,
    context: { params: { bks_id: string } }
) {
    const id = Number(context.params.bks_id);
    if (isNaN(id)) return NextResponse.json({ error: "Invalid book id" }, { status: 400 });

    try {
        const { rows } = await pool.query(
            `SELECT b.*, c.ctg_name
       FROM books b
       LEFT JOIN categories c ON b.bks_ctg_id = c.ctg_id
       WHERE b.bks_id = $1`,
            [id]
        );
        if (!rows[0]) return NextResponse.json({ error: "Book not found" }, { status: 404 });

        return NextResponse.json(rows[0]);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
}
