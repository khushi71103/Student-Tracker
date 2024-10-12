import MonthSelection from '@/app/_components/MonthSelection'
import React from 'react'

const Attendance = () => {
  return (
    <div className='p-10'>
        <h2 className='text-2xl font-bold'>Attendance</h2>
        {/* Search option  */}

        <div>
            <MonthSelection/>
        </div>

        {/* Student Attendance grid */}
    </div>
  )
}

export default Attendance