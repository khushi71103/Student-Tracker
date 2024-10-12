import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import { Button } from '@/components/ui/button';
import { Search, Trash } from 'lucide-react';

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

const StudentListTable = ({ StudentList }: any) => {
    const CustomButtons = (props: any) => {
        return <Button variant={"destructive"}><Trash /></Button>;
    };

    const [searchInput, setSearchInput] = useState<string>("");

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const [colDefs, setColDefs] = useState([
        {
            field: "id", filter: true
        },
        {
            field: "name", filter: true
        },
        {
            field: "address", filter: true
        },
        {
            field: "contact", filter: true
        },
        {
            field: "action",
            cellRenderer: CustomButtons 
        }
    ]);

    const [rowData, setRowData] = useState();

    useEffect(() => {
        setRowData(StudentList);
    }, [StudentList]);

    return (
        <div className='my-7'>
            <div className="ag-theme-quartz" style={{ height: 500 }}>
                {/* Search input */}
                <div className='p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm'>
                    <Search />
                    <input
                        type='text'
                        placeholder='Search on Anything...'
                        className='outline-none w-full'
                        value={searchInput}  
                        onChange={handleSearchInputChange}  
                    />
                </div>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                    quickFilterText={searchInput}
                />
            </div>
        </div>
    );
};

export default StudentListTable;
