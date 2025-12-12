import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";

export async function GET() {
    const { rows } = await pool.query(`
        SELECT * FROM users
    `)
    return NextResponse.json(rows);
}