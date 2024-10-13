"use client"
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import MonthSelection from '../_components/MonthSelection'
import GradeSelect from '../_components/GradeSelect'
import GlobalApi from '../api/_services/GlobalApi'
import moment from 'moment'
import StatusList from './_components/StatusList'
import BarChartComponent from './_components/BarChartComponent'
import PieChartComponent from './_components/PieChartComponent'

const Dashboard = () => {
  const { setTheme } = useTheme()
  const [selectedMonth,setSelectedMonth]=useState();
  const [selectGrade,setSelectedGrade]=useState();
  const [attendanceList,setattendanceList]=useState();
  const [totalPresentData,setTotalPresentDate]=useState([]);

  useEffect(()=>{
    setTheme('light')
    GetTotalPresentCountByDays();
    getStudentAttendance();
   

  },[selectedMonth||selectGrade])

  

  const getStudentAttendance=()=>{
    GlobalApi.GetAttendanceList(selectGrade,moment(selectedMonth).format('MM/yyyy'))
    .then((resp: any)=>{
      
      setattendanceList(resp.data)

    })
  }

  const GetTotalPresentCountByDays=()=>{
    GlobalApi.TotalPresentCountByDay(moment(selectedMonth).format('MM/yyyy'),selectGrade)
    .then((resp:any)=>{
      console.log("Data: ",resp.data)
      console.log("Grade",selectGrade);
      console.log("Month: ",moment(selectedMonth).format('MM/yyyy'))
      console.log("Full API response:", resp);
      console.log("Formatted Month: ", moment(selectedMonth).format('MM/yyyy'));
console.log("Selected Grade: ", selectGrade);


      
      setTotalPresentDate(resp.data)
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

      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
      <div className='md:col-span-2'>
        <BarChartComponent attendanceList={attendanceList}
        totalPresentData={totalPresentData}/>
      </div>
      <div>
        <PieChartComponent attendanceList={attendanceList}/>
      </div>
      </div>
      </div>
  )
}

export default Dashboard