import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/db";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ bks_id: string }> } // เปลี่ยน type เป็น Promise
) {
    const resolvedParams = await context.params; // await เพื่อให้ได้ object จริง
    const id = Number(resolvedParams.bks_id);

    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid book id" }, { status: 400 });
    }

    try {
        const { data, error } = await supabase
            .from("books")
            .select(`
                *,
                categories:ctg_id (
                ctg_name
                )
            `)
            .eq("bks_id", id)
            .single();

        if (error) {
            if (error.code == "PGRST116") {
                return NextResponse.json({ error: "Book not found" }, { status: 404 });
            }

            console.log(error);
            return NextResponse.json({ error: "DB error" }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
