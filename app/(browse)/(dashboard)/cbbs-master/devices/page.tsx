"use client";

import { useRouter } from "next/navigation";

const DevicesPage = () => {
  const router = useRouter();
  return router.back();
};

export default DevicesPage;
