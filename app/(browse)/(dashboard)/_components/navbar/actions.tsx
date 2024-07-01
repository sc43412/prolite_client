import { CLIENT_USER_PROFILE } from "@/endpoints";
import { getRequest } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export const Actions = async () => {
  const { client } = await getRequest(CLIENT_USER_PROFILE);

  return (
    <div className="flex items-center justify-end gap-x-3 ">
      <div className="flex flex-col text-right">
        <span className="text-[##093545] font-medium leading-[17.5px] capitalize">
          {client.userName || "User"}
        </span>
        <span className="text-[#09354580] text-xs">
          {client.email || "Email"}
        </span>
      </div>
      <Link href="/user/settings" className="hover:opacity-75">
        <Image src="/user.svg" alt="user" width={33.33} height={33.33} />
      </Link>
    </div>
  );
};
