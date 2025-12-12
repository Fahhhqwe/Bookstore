import { pool } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const { rows } = await pool.query(`
        SELECT * FROM categories
    `);
    return NextResponse.json(rows);
}

export async function POST(request: Request) {
    const {
        ctg_name
    } = await request.json();

    const { rows } = await pool.query(`
        INSERT INTO categories (
        ctg_name
        )
        VALUES ($1)
        RETURNING *
        `, [
        ctg_name
    ]);
    return NextResponse.json(rows[0]);
}

export async function PUT(request: Request) {
    const {
        ctg_id,
        ctg_name
    } = await request.json();

    const { rows } = await pool.query(`
        UPDATE categories
        SET
        ctg_name = $1
        WHERE ctg_id = $2
        RETURNING *    
    `, [
        ctg_name,
        ctg_id
    ]);

    return NextResponse.json({
        message: "Category updated successfully",
        updated: rows[0]
    });
}
