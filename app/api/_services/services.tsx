export const getUniqueRec = (attendanceList: any) => {
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