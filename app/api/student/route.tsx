import db from "@/utils/dbConfig";
import { STUDENTS } from "@/utils/schema";
import { eq } from "drizzle-orm";
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


export async function GET(req: any){
    const result=await db.select().from(STUDENTS);
    return NextResponse.json(result);
}

export async function DELETE(req:any) 
{
    const searchParams=req.nextUrl.searchParams;
    const id=searchParams.get('id');

    const result = await db.delete(STUDENTS).where(eq(STUDENTS.id,id));

    return NextResponse.json(result);
}