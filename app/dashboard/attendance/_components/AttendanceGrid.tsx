"use client";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import moment from "moment";
import GlobalApi from "@/app/api/_services/GlobalApi";
import { toast } from "sonner";
import { getUniqueRec } from "@/app/api/_services/services";

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];


const AttendanceGrid = ({ attendanceList,selectedMonth }: any) => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [colDefs, setColDefs] = useState([{ field: "studentId" , filter:true}, 
    { field: "name" , filter:true}]);

  useEffect(() => {
    if(attendanceList){
        const userList = getUniqueRec(attendanceList);
    setRowData(userList);

    daysArray.forEach((date) => {
      // Ensure the 'filter' property is defined for all column definitions
      setColDefs(prevData => [
          ...prevData,
          {
              field: date.toString(),
              width: 50,
              editable: true,
              filter: false // Add this to satisfy TypeScript
          }
      ]);

        userList.forEach(obj=>{
            obj[date]=isPresent(obj.studentId,date);
        })
    })
    }
    
  }, [attendanceList]);

  const isPresent = (studentId: any, day: any) => {
    const result = attendanceList.find(
        (item: { day: any; studentId: any }) => item.day === day && item.studentId === studentId // Compare item.studentId with the parameter studentId
    );
    return result ? true : false;
};


  const daysInMonth=(year: any,month: any)=>new Date(year,month+1,0).getDate();
  const noOfdays=daysInMonth(moment(selectedMonth).format('yyyy'),moment(selectedMonth).format('MM'))
  
  const daysArray=Array.from({length:noOfdays},(_,i)=>i+1)
  console.log(daysArray)

  

  const onMarkAttendance=(day: string | undefined,studentId: any,presentStatus: any)=>{
    const date=moment(selectedMonth).format('MM/yyyy');
    if(presentStatus)
    {
      const data={
        day:day,
        studentId:studentId,
        prsent:presentStatus,
        date:date,
      }

      GlobalApi.MarkAttendance(data).then((resp: any)=>{
        toast("Student Id: " +studentId +" Marked as present");
      })
    }
    else{
      GlobalApi.MarkAbsent(studentId,day,date)
      .then((resp: any)=>{
        toast("Student Id:" +studentId +" Marked as absent")
      })
    }
  }

  return (
    <div>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact rowData={rowData} columnDefs={colDefs} onCellValueChanged={(e)=>onMarkAttendance(e.colDef.field,e.data.studentId,e.newValue)}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
         />
      </div>
    </div>
  );
};

export default AttendanceGrid;
