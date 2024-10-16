const { default: axios } = require("axios");

const GetAllGrades=()=>axios.get('/api/grade');
const CreateNewStudent = async (data: any) => {
    try {
      return await axios.post('/api/student', data);
    } catch (error) {
      console.error("Error creating student:", error);
      throw error;
    }
  };
const GetAllStudents=()=>axios.get('/api/student');

const DeleteStudentRecord=(id: number, )=>axios.delete('/api/student?id='+id);

const GetAttendanceList=(grade:any,month:any)=>axios.get('/api/attendance?grade='+grade+'&month='+month
)

const MarkAttendance=(data:any)=>axios.post('/api/attendance',data);

const MarkAbsent = (studentId: string,day: any,date: string)=>axios.delete('/api/attendance?studentId='+studentId+"&day="+day+"&date="+date)

const TotalPresentCountByDay=(date:any,grade:any)=>axios.get('/api/dashboard?date='+date+"&grade="+grade)

export default{GetAllGrades, CreateNewStudent, GetAllStudents, DeleteStudentRecord,GetAttendanceList,MarkAttendance,MarkAbsent ,TotalPresentCountByDay}