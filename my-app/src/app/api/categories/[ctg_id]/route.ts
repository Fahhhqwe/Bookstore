import { supabase } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    context: { params: Promise<{ ctg_id: string }> }
) {
    const { ctg_id } = await context.params;
    const id = Number(ctg_id);

    if (isNaN(id)) {
        return NextResponse.json(
            { error: "Invalid category ID", id: ctg_id },
            { status: 400 }
        );
    }

    try {
        const { data, error } = await supabase
            .from("categories")
            .delete()
            .eq("ctg_id", id)
            .select()
            .single(); // เหมือน RETURNING *

        if (error) {
            if (error.code === "PGRST116") {
                return NextResponse.json(
                    { error: "Category not found" },
                    { status: 404 }
                );
            }

            console.error(error);
            return NextResponse.json(
                { error: "DB error" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: "Category deleted successfully",
            deleted: data,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}
