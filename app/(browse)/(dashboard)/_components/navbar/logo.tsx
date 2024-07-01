import Image from "next/image";

import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/dashboard">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white shrink-0 lg:shrink">
          <Image src="/prolite.svg" alt="logo" width="68" height="33" />
        </div>
      </div>
    </Link>
  );
};
