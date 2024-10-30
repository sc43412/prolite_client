"use client";

import { ModalDialog } from "@/components/dialog";
import { Dropdown } from "@/components/dropdown";
import { Button } from "@/components/ui/button";
import { CBS_BACKUP_TIMER, CBS_CANCEL_SCHEDULED_AUTOTEST } from "@/endpoints";
import { postRequest } from "@/lib/api";
import { ChevronDown } from "lucide-react";

export const AutoTest = ({cbs_id}:{cbs_id : string}) => {
  const options = [
    {
      label: "Manual Auto-test",
      type: "manual",
    },
    {
      label: "Schedule Auto-test",
      type: "schedule",
    },
  ];

  return (
    <Dropdown
      trigger={
        <Button
          type="submit"
          onClick={(e) => e.stopPropagation()}
          className="h-[33px] px-6 rounded-[5px] flex items-center justify-between w-full lg:w-fit group"
        >
          Auto-test
          <ChevronDown className="ml-2 group-focus:rotate-180 transition" />
        </Button>
      }
    >
      {options.map((item, i) => (
        <ModalDialog key={i} manual={item.type === "manual"} cbs_id={cbs_id}>
          <Button
            onClick={(e) => e.stopPropagation()}
            key={i}
            variant="ghost"
            className="text-black !py-0 text-xs leading-[15px] w-full flex justify-start"
          >
            {item.label}
          </Button>
        </ModalDialog>
      ))}
      <Button
        variant="ghost"
        className="text-black !py-0 text-xs leading-[15px] w-full flex justify-start"
        onClick={async ()=>{
          console.log("print called")
          try{
          await postRequest(
            CBS_CANCEL_SCHEDULED_AUTOTEST,
            {
              cbs_id,
              
            }
            
          )
        } catch(e){
          console.log("error",e)
        }
        }}
      >
        Cancel Scheduled Auto-test
      </Button>
    </Dropdown>
  );
};
