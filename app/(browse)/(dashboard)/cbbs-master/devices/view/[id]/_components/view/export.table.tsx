'use client'; // This directive tells Next.js to render this component on the client-side

import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
// import { CBS_LOGS_DOWNLOAD } from '@/endpoints';
// import { downloadGetRequest } from '@/lib/api';
import { getSession } from "@/actions";
import { toast } from "sonner";
import { postRequest } from '@/lib/api';
import { CBS_MAKE_DOWNLOAD_URL, CBS_VIEW, DEVICE_MAKE_DOWNLOAD_URL, NOTIFICATION_MAKE_DOWNLOAD_URL } from '@/endpoints';

interface ExportButtonProps {
    device_id: string;
  }
const ExportButtonForDevice : React.FC<ExportButtonProps> = ({device_id}) => {
  const handleDownload = async () => {
    const data = await postRequest(
        DEVICE_MAKE_DOWNLOAD_URL,
        {
            device_id
        }
      );
      const data2 = await postRequest(
        NOTIFICATION_MAKE_DOWNLOAD_URL,
        {
          device_id
        }
    )   
     if(data?.url){
     console.log(data?.url)
     window.open(data?.url, '_blank');
     }

     if(data2?.url){
      console.log(data?.url)
  
        window.open(data2?.url, '_blank');
 
      
      }
  };



  return (
    <Button
      className="flex gap-x-2 items-center h-8 w-[102px]"
      variant="outline"
      onClick={handleDownload}
    >
      <Upload className="size-4 font-bold" /> Export
    </Button>
  );
};

export default ExportButtonForDevice;