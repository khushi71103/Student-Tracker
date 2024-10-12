"use client"
import React, { useEffect, useState } from 'react'
import AddNewStudent from './_components/AddNewStudent'
import GlobalApi from '@/app/api/_services/GlobalApi'

const Student = () => {

  const [studentList,setStudentList]=useState([]);
  useEffect(()=>{
    GetAllStudents();
  },[])

  const GetAllStudents=()=>{
    GlobalApi.GetAllStudents().then((resp: { data: any })=>{
      setStudentList(resp.data)
    })
  }
  return (
    <div className='p-7'>
        <h2 className='font-bold text-2xl flex justify-between items-center'>
        Students
        <AddNewStudent/>
        </h2>
        </div>
  )
}

export default Student