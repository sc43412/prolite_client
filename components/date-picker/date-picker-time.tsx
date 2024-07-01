"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Control, ControllerRenderProps } from "react-hook-form";

interface DatePickerWithTimeProps {
  field: ControllerRenderProps<any, any>;
}

export function DatePickerWithTime({ field }: DatePickerWithTimeProps) {
  const selectedDate = field.value ? new Date(field.value) : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          onClick={(e) => e.stopPropagation()}
          variant={"outline"}
          className={cn(
            "w-[150px] lg:w-[310px] justify-between text-left font-normal border-input border",
            !field.value && "text-muted-foreground"
          )}
        >
          {field.value ? (
            format(selectedDate ?? new Date(), "PPP")
          ) : (
            <span>DD/MM/YYYY</span>
          )}
          <CalendarIcon className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => field.onChange(date?.toISOString())}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
