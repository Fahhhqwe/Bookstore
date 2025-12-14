import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/db";

export async function GET(req: NextRequest) {
    try {
        const { data, error } = await supabase
            .from('books')
            .select(`
                *,
                categories:ctg_id (
                    ctg_name
                )
            `);

        if (error) {
            console.error(error);
            return NextResponse.json({ error: "DB error" }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
