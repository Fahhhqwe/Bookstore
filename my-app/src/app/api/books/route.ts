import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/db";

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("books")
            .select(`
        *,
        categories:bks_ctg_id (
          ctg_name
        )
      `);

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data ?? []);
    } catch (err) {
        console.error("Server error:", err);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}
