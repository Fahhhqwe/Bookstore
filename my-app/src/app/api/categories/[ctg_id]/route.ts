import { pool } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    context: { params: Promise<{ ctg_id: string }> }
) {
    const { ctg_id } = await context.params; // <-- ต้อง await

    const id = Number(ctg_id);

    if (isNaN(id)) {
        return NextResponse.json(
            { error: "Invalid category ID", id: ctg_id },
            { status: 400 }
        );
    }

    const { rows } = await pool.query(
        `DELETE FROM categories WHERE ctg_id = $1 RETURNING *`,
        [id]
    );

    if (rows.length === 0) {
        return NextResponse.json(
            { error: "Category not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({
        message: "Category deleted successfully",
        deleted: rows[0],
    });
}
