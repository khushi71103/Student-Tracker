"use client"
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import MonthSelection from '../_components/MonthSelection'
import GradeSelect from '../_components/GradeSelect'
import GlobalApi from '../api/_services/GlobalApi'
import moment from 'moment'
import StatusList from './_components/StatusList'

const Dashboard = () => {
  const { setTheme } = useTheme()
  const [selectedMonth,setSelectedMonth]=useState();
  const [selectGrade,setSelectedGrade]=useState();
  const [attendanceList,setattendanceList]=useState();

  useEffect(()=>{
    setTheme('light')
    getStudentAttendance();

  },[selectedMonth])

  useEffect(()=>{
    getStudentAttendance();

  },[selectGrade])

  const getStudentAttendance=()=>{
    GlobalApi.GetAttendanceList(selectGrade,moment(selectedMonth).format('MM/yyyy'))
    .then((resp: any)=>{
      setattendanceList(resp.data)

    })
  }

  return (
    <div className='p-10'>
      <div className='flex items-center justify-between'>
      <h2 className='font-bold text-2xl'>Dashboard</h2>

      <div className='flex items-center gap-4'>
        <MonthSelection selectedMonth={setSelectedMonth}/>
        <GradeSelect selectGrade={(v: React.SetStateAction<undefined>)=>{setSelectedGrade(v)}}/>
      </div>
      </div>
      <StatusList attendanceList={attendanceList}/>
      </div>
  )
}

export default Dashboard