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

const DeleteStudentRecord=(id:number)=>axios.delete('/api/student?id='+id)

export default{GetAllGrades, CreateNewStudent, GetAllStudents, DeleteStudentRecord}