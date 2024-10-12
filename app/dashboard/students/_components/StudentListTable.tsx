import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from "@/components/ui/button";
import { Search, Trash, Loader } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "@/app/api/_services/GlobalApi";
import { toast } from "sonner";

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

const StudentListTable = ({ StudentList, refreshData }: any) => {
  const CustomButtons = (props: any) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button size={"sm"} variant={"destructive"}>
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              record and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>DeleteRecord(props?.data?.id)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  const [colDefs, setColDefs] = useState([
    {
      field: "id",
      filter: true,
    },
    {
      field: "name",
      filter: true,
    },
    {
      field: "address",
      filter: true,
    },
    {
      field: "contact",
      filter: true,
    },
    {
      field: "action",
      cellRenderer: CustomButtons,
    },
  ]);

  const [rowData, setRowData] = useState();

  useEffect(() => {
    // Simulate data fetching from the backend
    setTimeout(() => {
      setRowData(StudentList); // Set row data once it arrives
      setIsLoading(false); // Set loading to false
    }, 2000); // Simulated 2 seconds delay
  }, [StudentList]);

  const DeleteRecord=(id: number)=>{
    GlobalApi.DeleteStudentRecord(id).then((resp: any)=>{
        if(resp)
        {
            toast('Record Deleted Sucessfully!')
            refreshData()
        }
    })
  }

  return (
    <div className="my-7">
      <div className="p-4 mb-4 border rounded-lg shadow-md bg-white w-1/5 justify-center">
        <h2 className="text-xl font-bold">Total Students</h2>
        <p className="text-lg">{StudentList?.length || 0}</p>{" "}
        {/* Display total number of students */}
      </div>

      {/* Loader while data is being fetched */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-gray-500" size={48} />
        </div>
      ) : (
        <div className="ag-theme-quartz" style={{ height: 500 }}>
          {/* Search input */}
          <div className="p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm">
            <Search />
            <input
              type="text"
              placeholder="Search on Anything..."
              className="outline-none w-full"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>

          {/* Data Table */}
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
            quickFilterText={searchInput}
          />
        </div>
      )}
    </div>
  );
};

export default StudentListTable;
