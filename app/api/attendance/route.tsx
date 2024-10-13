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
    .leftJoin(ATTENDANCE,eq(STUDENTS.id,ATTENDANCE.studentId))
    .where(
        or(
            eq(STUDENTS.grade, grade),     
            eq(ATTENDANCE.date, month)     
        )
    );

    return NextResponse.json(result)
}