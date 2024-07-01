import Image from "next/image";

import power from "./assets/power.svg";
import fire from "./assets/fire.svg";
import electric from "./assets/electric.svg";
import { Dropdown } from "@/components/dropdown";

export const DetailsCardHeader = ({ triggered }: { triggered?: boolean }) => {
  const triggers = [
    {
      label: "AC Cut Off",
      icon: power,
      bg: "#ED553B33",
      triggered: triggered || true,
    },
    {
      label: "Fire Signal",
      icon: fire,
      bg: "#FBE8B5",
      triggered: triggered || true,
    },
    {
      label: "DB Cut Off",
      icon: electric,
      bg: "#C8E7FF",
      triggered: triggered || true,
    },
  ];

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
