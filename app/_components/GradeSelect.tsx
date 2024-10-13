"use client"
import React, { useEffect, useState } from 'react';
import GlobalApi from '../api/_services/GlobalApi';

const GradeSelect = ({ selectGrade }: any) => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    GetAllGradesList();
  }, []);

  const GetAllGradesList = () => {
    GlobalApi.GetAllGrades().then((resp: { data: any }) => {
      setGrades(resp.data);
    });
  };

  return (
    <div className="flex flex-col py-2">
      <select
        className="p-2 border rounded-lg"
        onChange={(e) => selectGrade(e.target.value)}
      >
        <option value="1st sem">1st sem</option>
        <option value="2nd sem">2nd sem</option>
        <option value="3rd sem">3rd sem</option>
        <option value="4th sem">4th sem</option>
        <option value="5th sem">5th sem</option>
        <option value="6th sem">6th sem</option>
        <option value="7th sem">7th sem</option>
        <option value="8th sem">8th sem</option>
      </select>
    </div>
  );
};

export default GradeSelect;

