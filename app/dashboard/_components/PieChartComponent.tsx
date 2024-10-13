import { getUniqueRec } from "@/app/api/_services/services";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

const PieChartComponent = ({attendanceList}:any) => {

    const data01 = [
        {
          "name": "Group A",
          "value": 400
        },
        {
          "name": "Group B",
          "value": 300
        },
    ]

    const [data, setData] = useState<{ name: string; value: number;fill: string }[]>([]);

    useEffect(()=>{
        console.log(attendanceList)
          if(attendanceList)
          {
              const totalSt=getUniqueRec(attendanceList);
  
              const today=moment().format('D');
              const Presentperc=(attendanceList.length/(totalSt.length*Number(today))*100)

              setData([
                {
                  name: 'Total Present',
                  value: parseFloat(Presentperc.toFixed(1)),
                  fill: '#4c8cf8'
                },
                {
                  name: 'Total Absent',
                  value: parseFloat((100 - Presentperc).toFixed(1)), // Format to 2 decimal places
                  fill: '#1fe6d1'
                  
                }
              ]);
              
          }
      },[attendanceList])
  return (
    <div className="border p-5 rounded-lg">
        <h2 className="font-bold text-lg">Monthly Attendance</h2>
        <ResponsiveContainer width={'100%'} height={300}>
      <PieChart width={730} height={250}>
     
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          label
        />
      </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
