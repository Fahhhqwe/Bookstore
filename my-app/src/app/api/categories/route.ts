import { supabase } from "@/app/lib/db";
import { NextResponse } from "next/server";

/* ========= GET ========= */
export async function GET() {
    const { data, error } = await supabase
        .from("categories")
        .select("*");

    if (error) {
        console.error(error);
        return NextResponse.json(
            { error: "DB error" },
            { status: 500 }
        );
    }

    return NextResponse.json(data);
}

/* ========= POST ========= */
export async function POST(request: Request) {
    const { ctg_name } = await request.json();

    const { data, error } = await supabase
        .from("categories")
        .insert({ ctg_name })
        .select()
        .single(); // เหมือน RETURNING *

    if (error) {
        console.error(error);
        return NextResponse.json(
            { error: "DB error" },
            { status: 500 }
        );
    }

    return NextResponse.json(data);
}

/* ========= PUT ========= */
export async function PUT(request: Request) {
    const { ctg_id, ctg_name } = await request.json();

    const { data, error } = await supabase
        .from("categories")
        .update({ ctg_name })
        .eq("ctg_id", ctg_id)
        .select()
        .single(); // RETURNING *

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
        message: "Category updated successfully",
        updated: data,
    });
}
