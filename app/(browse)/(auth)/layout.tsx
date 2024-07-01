import Image from "next/image";
import wave from "./assets/wave-bg.png";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen relative flex justify-center items-center">
      <div className="absolute bottom-0 -z-10">
        <Image src={wave} alt="" className="w-screen" />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
