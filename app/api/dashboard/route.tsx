import db from "@/utils/dbConfig";
import { ATTENDANCE,STUDENTS } from "@/utils/schema";
import { sql,and,eq,desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req:any) {
    const searchParams=req.nextUrl.searchParams;
    const date=searchParams.get('date')
    const grade=searchParams.get('grade')
    console.log("date is" , date);
    console.log("grade is" , grade);

    const result=await db.select({
        day:ATTENDANCE.day,
        presentCount:sql`count(${ATTENDANCE.day})`
    }).from(ATTENDANCE)
    .leftJoin(STUDENTS,and(eq(ATTENDANCE.studentId,STUDENTS.id),eq(ATTENDANCE.date,date)))
    .groupBy(ATTENDANCE.day)
    .where(eq(STUDENTS.grade,grade))
    .orderBy(desc(ATTENDANCE.day))
    .limit(7)



    return NextResponse.json(result);
    
}