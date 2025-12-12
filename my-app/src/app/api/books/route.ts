import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/app/lib/db";

export async function GET(req: NextRequest) {
    try {
        const { rows } = await pool.query(
            `SELECT b.*, c.ctg_name
       FROM books b
       LEFT JOIN categories c ON b.bks_ctg_id = c.ctg_id`
        );
        return NextResponse.json(rows);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
}
