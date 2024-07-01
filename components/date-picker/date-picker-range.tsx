"use client";

import * as React from "react";
import { format, isAfter } from "date-fns";
import { Calendar as CalendarIcon, MoveRight } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const today = new Date();

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-fit lg:w-[250px] h-[34px] flex gap-x-3 font-normal border-[#D6D6D6] text-[#D6D6D6] hover:border-primary",
              !date && "text-muted-foreground group",
              date && "text-black border-primary"
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span className="flex items-center justify-between w-full text-[#BEBEBE] group-hover:text-black transition">
                Start Date <MoveRight /> End Date
              </span>
            )}
            <CalendarIcon className="size-[18px] text-[#BEBEBE] group-hover:text-black transition" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            toMonth={today}
            disabled={{ after: today }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
