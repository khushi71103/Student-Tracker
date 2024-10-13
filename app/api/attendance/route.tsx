import Attendance from "@/app/dashboard/attendance/page";
import db from "@/utils/dbConfig"
import { ATTENDANCE,STUDENTS } from "@/utils/schema"
import { NextResponse } from "next/server"
import { eq,and, or } from "drizzle-orm"; 

export async function GET(req:any) {

    const searchParam=req.nextUrl.searchParams;
    const grade=searchParam.get('grade');
    const month=searchParam.get('month');

    const result = await db.select({
        name:STUDENTS.name,
        present:ATTENDANCE.present,
        day:ATTENDANCE.day,
        date:ATTENDANCE.date,
        grade:STUDENTS.grade,
        studentId:STUDENTS.id,
        attendanceId:ATTENDANCE.id
    }).from(STUDENTS)
    .leftJoin(ATTENDANCE,and(eq(STUDENTS.id,ATTENDANCE.studentId),eq(ATTENDANCE.date,month))
    
    );

    return NextResponse.json(result)
}

export async function POST(req:any,res:any){
    const data=await req.json();
    const result=await db.insert(ATTENDANCE)
    .values({
        studentId:data.studentId,
        present:data.present,
        day:data.day,
        date:data.date
    })

    return NextResponse.json(result);
}

export async function DELETE(req:any){
    const searchParams=req.nextUrl.searchParams;
    const studentId=searchParams.get('studentId');
    const date = searchParams.get('date');
    const day = searchParams.get('day');

    const result=await db.delete(ATTENDANCE)
    .where(
        and(
            eq(ATTENDANCE.studentId, studentId),
            eq(ATTENDANCE.day, day),
            eq(ATTENDANCE.date, date)
        )
    );

    return NextResponse.json(result);
}