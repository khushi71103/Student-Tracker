"use client";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import moment from "moment";

const AttendanceGrid = ({ attendanceList,selectedMonth }: any) => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [colDefs, setColDefs] = useState([{ field: "studentId" }, { field: "name" }]);

  useEffect(() => {
    if(attendanceList){
        const userList = getUniqueRec();
    setRowData(userList);

    daysArray.forEach((date)=>{
        setColDefs(prevData=>[...prevData,{
            field:date.toString(),width:50,editable:true
        }])

        userList.forEach(obj=>{
            obj[date]=idPresent(obj.studentId,date);
        })
    })
    }
    
  }, [attendanceList]);

  const idPresent=(studentId: any,day: any)=>{
    const result=attendanceList.find((item: { day: any; studentId: any; })=>item.day===day&&item.studentId)
    return result?true:false
  }

  const daysInMonth=(year: any,month: any)=>new Date(year,month+1,0).getDate();
  const noOfdays=daysInMonth(moment(selectedMonth).format('yyyy'),moment(selectedMonth).format('MM'))
  
  const daysArray=Array.from({length:noOfdays},(_,i)=>i+1)
  console.log(daysArray)

  const getUniqueRec = () => {
    const uniquerec: any[] = [];
    const existingUser = new Set();


    attendanceList?.forEach((record: { studentId: unknown }) => {
      if (!existingUser.has(record.studentId)) {
        existingUser.add(record.studentId);
        uniquerec.push(record);
      }
    });
    return uniquerec;
  };
  return (
    <div>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
};

export default AttendanceGrid;
