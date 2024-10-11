import db from "@/utils/dbConfig";
import { STUDENTS } from "@/utils/schema";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json(); 

        // Insert data into the database
        const result = await db.insert(STUDENTS).values({
            name: data?.name,      
            grade: data?.grade,    
            address: data?.address,
            contact: data?.contact
        });

        // Return success response
        return NextResponse.json(result);
    } catch (error) {
        // Return error response
        return NextResponse.json({ error: "Failed to add student" }, { status: 500 });
    }
}
