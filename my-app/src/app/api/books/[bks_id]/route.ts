import { pool } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    context: { params: Promise<{ bks_id: string }> }
) {
    const { bks_id } = await context.params; // <-- ต้อง await

    const id = Number(bks_id);

    if (isNaN(id)) {
        return NextResponse.json(
            { error: "Invalid book ID", id: bks_id },
            { status: 400 }
        );
    }

    const { rows } = await pool.query(
        `DELETE FROM books WHERE bks_id = $1 RETURNING *`,
        [id]
    );

    if (rows.length === 0) {
        return NextResponse.json(
            { error: "Book not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({
        message: "Book deleted successfully",
        deleted: rows[0],
    });
}
