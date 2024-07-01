import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-[70vh] flex justify-center items-center">
      <Loader className="animate-spin size-10 lg:size-20" />
    </div>
  );
};

export default Loading;
