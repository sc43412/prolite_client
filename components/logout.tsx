import { logout } from "@/actions";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const Logout = ({ className }: { className?: string }) => {
  return (
    <form action={logout}>
      <Button
        className={cn(
          "bg-[#ED553B] hover:bg-[#ED553B]/90 rounded-[5px] w-[122px]",
          className
        )}
      >
        Logout
      </Button>
    </form>
  );
};
