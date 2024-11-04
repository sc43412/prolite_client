"use client"
import Image from "next/image";

import power from "./assets/power.svg";
import fire from "./assets/fire.svg";
import electric from "./assets/electric.svg";
import { Dropdown } from "@/components/dropdown";
import { useEffect, useState } from "react";
import { postRequest } from "@/lib/api";
import { CBS_VIEW } from "@/endpoints";

export const DetailsCardHeader = ({ triggered_ac,triggered_fire,tiggered_db,cbs_id }: { triggered_ac? : boolean;triggered_fire?: boolean;tiggered_db?:boolean,cbs_id?:any}) => {
 
  const [triggers, setTriggers] = useState([
    { label: "AC Cut Off", icon: power, bg: "#ED553B33", triggered: triggered_ac || false },
    { label: "Fire Signal", icon: fire, bg: "#FBE8B5", triggered: triggered_fire || false },
    { label: "DB Cut Off", icon: electric, bg: "#C8E7FF", triggered: tiggered_db || false },
  ]);

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const data = await postRequest(CBS_VIEW, { cbs_id: cbs_id });
        setTriggers([
          { label: "AC Cut Off", icon: power, bg: "#ED553B33", triggered: data?.mains_status===0 ? true : false || false },
          { label: "Fire Signal", icon: fire, bg: "#FBE8B5", triggered: data?.fire_signal || false },
          { label: "DB Cut Off", icon: electric, bg: "#C8E7FF", triggered: data?.db_cutoff || false },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }; 
  
    fetchData();

    // Set up interval for polling
    const intervalId = setInterval(fetchData, 10000); // Fetch every 10 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  },[])
  
  // const triggers = [
  //   {
  //     label: "AC Cut Off",
  //     icon: power,
  //     bg: "#ED553B33",
  //     triggered: triggered_ac || false,
  //   },
  //   {
  //     label: "Fire Signal",
  //     icon: fire,
  //     bg: "#FBE8B5",
  //     triggered: triggered_fire || false,
  //   },
  //   {
  //     label: "DB Cut Off",
  //     icon: electric,
  //     bg: "#C8E7FF",
  //     triggered: tiggered_db || false,
  //   },
  // ];

  return (
    <>
      <div className="xl:flex justify-evenly gap-x-2 items-center font-medium text-[10px] hidden">
        <span className="text-primary text-xs">Triggers :</span>
        {triggers.map((item, index) => (
          <div
            key={index}
            className="w-[93px] h-[25px] flex items-center justify-between px-[10px] py-[5px] rounded-[5px]"
            style={{ backgroundColor: item.triggered ? item.bg : "#EDEDED" }}
          >
            <Image src={item.icon} alt="" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div className="font-medium text-[10px]">
        <Dropdown
          trigger={
            <span className="text-primary text-xs underline xl:hidden cursor-pointer">
              Triggers
            </span>
          }
        >
          {triggers.map((item, index) => (
            <div
              key={index}
              className="w-full h-[25px] text-[10px] flex items-center justify-center gap-x-3 px-[10px] py-[5px] rounded-[5px]"
              style={{ backgroundColor: item.triggered ? item.bg : "#EDEDED" }}
            >
              <Image priority src={item.icon} alt="" />
              <span>{item.label}</span>
            </div>
          ))}
        </Dropdown>
      </div>
    </>
  );
};
