"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import GlobalApi from '@/app/api/_services/GlobalApi'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'

type Inputs = {
    name: string
    grade: string
    contact: number
    address: string
  }
  

const AddNewStudent = ({refreshData}:any) => {
    const [open,setOpen] = useState(false);
    const [grades,setGrades]=useState([]);
    const [loading,setLoading]=useState(false);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm<Inputs>()
    
    useEffect(()=>{
        GetAllGradesList();
    },[])
    
    const GetAllGradesList = () =>{
        GlobalApi.GetAllGrades().then((resp: { data: any })=>{
            setGrades(resp.data)
        })
        console.log(grades);
    }
    
      const onSubmit = (data: any)=>{
        // console.log("Submitting form data:", data);
        setLoading(true)
        GlobalApi.CreateNewStudent(data).then((resp: any)=>{
            console.log("--",resp)
            if(resp.data)
            {
                reset();
                refreshData();
                setOpen(false);
                toast('New Student added');
            }
            setLoading(false);

        })
      }

     
  return (
    <div>
        <Button className='text-white font-bold text-sm' onClick={()=> setOpen(true)}>+ Add New Student</Button>
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='py-3'>
                        <label>Full Name</label>
                        <Input placeholder='Ex. Khushi Chhetri'
                        {...register('name',{required:true})}/>
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Select Grade</label>
                        <select className='p-3 border rounded-lg' {...register('grade',{required:true})}>
                            {/* {grades.map((item: { garde: string | number | readonly string[] | undefined; grade: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined },index: any)=>(
                                <option key={index} value={item.garde}>{item.grade}</option>
                            ))} */}
                        <option value={'1st sem'}>
                        1<sup className="align-super text-sm">st</sup> sem
                        </option>
                        <option value={'2nd sem'}>
                        2<sup className="align-super text-sm">nd</sup> sem
                        </option>
                        <option value={'3rd sem'}>
                        3<sup className="align-super text-sm">rd</sup> sem
                        </option>
                        <option value={'4th sem'}>
                        4<sup className="align-super text-sm">th</sup> sem
                        </option>
                        <option value={'5th sem'}>
                        5<sup className="align-super text-sm">th</sup> sem
                        </option>
                        <option value={'6th sem'}>
                        6<sup className="align-super text-sm">th</sup> sem
                        </option>
                        <option value={'7th sem'}>
                        7<sup className="align-super text-sm">th</sup> sem
                        </option>
                        <option value={'8th sem'}>
                        8<sup className="align-super text-sm">th</sup> sem
                        </option>
                        </select>
                    </div>
                    <div className='py-3'>
    <label>Contact Number</label>
    <Input 
        placeholder='Ex. 9365480261' 
        type='tel' 
        maxLength={10}  // Restrict input length to 10 characters
        onInput={(e) => {
            // Cast e.target to HTMLInputElement to access value
            const input = e.target as HTMLInputElement;
            // Ensure only numbers are entered and no more than 10 digits
            input.value = input.value.slice(0, 10);
        }}
        {...register('contact', {
            required: "Contact number is required",
            minLength: {
                value: 10,
                message: "Contact number must be exactly 10 digits",
            },
            maxLength: {
                value: 10,
                message: "Contact number must be exactly 10 digits",
            },
            pattern: {
                value: /^[0-9]{10}$/, 
                message: "Contact number must be 10 digits",
            }
        })}
    />
    {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}
</div>



                    <div className='py-3'>
                        <label>Address</label>
                        <Input placeholder='Ex. Street 5 ,New'
                        {...register('address')}/>
                    </div>
                    <div className='flex gap-3 items-center justify-end mt-5'>
                        <Button type='button' onClick={()=>setOpen(false)} variant="ghost">Cancel</Button>
                        <Button type='submit' disabled={loading}>
                            {loading ?<Loader className='animate-spin'/> : "Save" }
                            
                            </Button>
                    </div>
                    </form>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default AddNewStudent