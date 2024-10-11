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

export default{GetAllGrades, CreateNewStudent}