import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";

export async function GET() {
    try {
        const { rows } = await pool.query(
            `SELECT b.*, c.ctg_name
       FROM books b
       LEFT JOIN categories c ON b.bks_ctg_id = c.ctg_id
       ORDER BY b.bks_id ASC`
        );

        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error("Error fetching books:", error);
        return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
    }
}
