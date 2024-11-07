"use client"
import { Switch } from "@/components/ui/switch";
import { DEVICE_MAINTAIN_TOGGLE, DEVICE_VIEW } from "@/endpoints";
import { postRequest } from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
interface SwitchComponentProps {
  deviceId: string;
  type : "coil" |"maintain";
  initialChecked: boolean;
  className: string;
  generatePayload: (deviceId: string, checked: boolean) => Promise<{ url: string; body: Record<string, any> }>;
  // generatePayload: (deviceId: string, checked: boolean) => { url: string; body: Record<string, any> };
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({ deviceId,type, initialChecked, className, generatePayload }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleClick = async () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    const payload = await generatePayload(deviceId, newValue);
    await postRequest(payload.url, payload.body);
    if(type==="coil"){
      toast.success("Triggered Device Status Toggle")
    } else {
      toast.success("Triggered Device Type Toggle")
    }
  
    setTimeout(async ()=>{
      const { deviceData } = await postRequest(DEVICE_VIEW, {
        device_id: deviceId,
      });
      if(type==="coil"){
      
        setIsChecked(deviceData?.coil_value===1 ? true : false)
      } else {
        setIsChecked(deviceData?.is_maintain)
      }
    },10000)
    
   
   
  };

  // Update the checked state if initialChecked changes
  useEffect(() => {
    setIsChecked(initialChecked);
  }, [initialChecked]);


  return (
    <>
    <Switch
      className={className}
      checked={isChecked}
      onClick={handleClick}
    />
   { (type != "coil") &&  <span className="text-[#707070]">
          {isChecked ? "M" : "NM"}
        </span>}

        {
          (type == "coil") && <span  className={cn(
            isChecked ?   "text-[#58B761]" : "text-[#FF3131]"
          )}>
            {isChecked ? "A" : "IN"}
          </span>
        }
        </>
  );
};

  export default SwitchComponent;