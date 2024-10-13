'use client'
import GradeSelect from '@/app/_components/GradeSelect'
import MonthSelection from '@/app/_components/MonthSelection'
import GlobalApi from '@/app/api/_services/GlobalApi'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import React, { useState } from 'react'
import AttendanceGrid from './_components/AttendanceGrid'

const Attendance = () => {

    const [selectMonth,setSelectMonth]=useState();
    const [selectGrade,setSelectGrade]=useState();
    const [attendanceList,setAttendanceList]=useState();

    const OnSearchHandler=()=>{
        const month=moment(selectMonth).format('MM/YYYY');
        GlobalApi.GetAttendanceList(selectGrade,month).then((resp: { data: any })=>{
            setAttendanceList(resp.data);
        })
    }
  return (
    <div className='p-10'>
        <h2 className='text-2xl font-bold'>Attendance</h2>
        {/* Search option  */}

        <div className='flex gap-5 my-5 p-5 border rounded-lg shadow-sm'>
            <div className='flex gap-2 items-center'>
                <label>Select Month:</label>
                <MonthSelection selectedMonth={(value:any)=>setSelectMonth(value)}/>
            </div>

            <div className='flex gap-2 items-center'>
                <label>Select semester</label>
                <GradeSelect selectGrade={(v:any)=>setSelectGrade(v)}/>
            </div>
            <div className='pt-1'>
            <Button className='font-bold ' onClick={()=>OnSearchHandler()}>
                Search
            </Button>
            </div>
        </div>

        {/* Student Attendance grid */}
        <AttendanceGrid attendanceList={attendanceList}
        selectedMonth={selectMonth}/>
    </div>
  )
}

export default Attendance