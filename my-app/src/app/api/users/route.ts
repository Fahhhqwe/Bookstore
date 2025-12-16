import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/db";

export async function GET() {
    const { data } = await supabase
        .from("users")
        .select("*");

    return NextResponse.json(data);
}
