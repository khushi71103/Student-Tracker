import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import {addMonths} from 'date-fns';

const MonthSelection = () => {
    const today=new Date();

    const nextMonths=addMonths()
  return (
    <div>
      <Popover>
        <PopoverTrigger>
            <Button variant={"outline"} className="flex gap-2 items-center text-slate-500">
                <CalendarDays className="h-5 w-5"/>Month
            </Button>
        </PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>
    </div>
  );
};

export default MonthSelection;
