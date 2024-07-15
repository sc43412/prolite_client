'use client'; // This directive tells Next.js to render this component on the client-side

import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
// import { CBS_LOGS_DOWNLOAD } from '@/endpoints';
// import { downloadGetRequest } from '@/lib/api';
import { getSession } from "@/actions";
import { toast } from "sonner";
import { postRequest } from '@/lib/api';
import { CBS_MAKE_DOWNLOAD_URL, CBS_VIEW, NOTIFICATION_MAKE_DOWNLOAD_URL } from '@/endpoints';
import { Download } from "lucide-react";


const DownloadButton  = () => {
  const handleDownload = async () => {
    const data = await postRequest(
        CBS_MAKE_DOWNLOAD_URL,
      );
    const data2 = await postRequest(
        NOTIFICATION_MAKE_DOWNLOAD_URL
    )  
     if(data?.url){
     console.log(data?.url)
     setTimeout(() => {
      window.open(data?.url, '_blank');
    }, 1000);
    //  window.open(data?.url, '_blank');
     }
     if(data2?.url){
        console.log(data2?.url)
        window.open(data2?.url,'_blank')
     }
  };



  return (
    <Button
        className="flex gap-2 absolute -right-3 -top-12 md:-top-14"
        variant="ghost"
        onClick={handleDownload}
      >
        <Download className="size-5" /> Download
      </Button>
  );
};

export default DownloadButton;