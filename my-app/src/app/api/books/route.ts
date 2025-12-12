import { pool } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const { rows } = await pool.query(`
        SELECT * FROM books
    `)
    return NextResponse.json(rows);
}

export async function POST(request: Request) {
    const {
        bks_ctg_id,
        bks_name,
        bks_author,
        bks_publisher,
        bks_year,
        bks_description,
        bks_price,
        bks_url
    } = await request.json();

    const { rows } = await pool.query(`
        INSERT INTO books (
        bks_ctg_id, 
        bks_name, 
        bks_author, 
        bks_publisher, 
        bks_year, 
        bks_description, 
        bks_price, 
        bks_url
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
        `, [
        bks_ctg_id,
        bks_name,
        bks_author,
        bks_publisher,
        bks_year,
        bks_description,
        bks_price,
        bks_url
    ]);
    return NextResponse.json(rows[0]);
}

export async function PUT(request: Request) {
    const {
        bks_id,
        bks_ctg_id,
        bks_name,
        bks_author,
        bks_publisher,
        bks_year,
        bks_description,
        bks_price,
        bks_url
    } = await request.json();

    const { rows } = await pool.query(`
        UPDATE books
        SET
        bks_ctg_id = $1,
        bks_name = $2,
        bks_author = $3,
        bks_publisher = $4,
        bks_year = $5,
        bks_description = $6,
        bks_price = $7,
        bks_url = $8
        WHERE bks_id = $9
        RETURNING *
    `, [
        bks_ctg_id,
        bks_name,
        bks_author,
        bks_publisher,
        bks_year,
        bks_description,
        bks_price,
        bks_url,
        bks_id
    ]);

    if (rows.length === 0) {
        return NextResponse.json(
            { error: "Book not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({
        message: "Book updated successfully",
        update: rows[0]
    });
}
