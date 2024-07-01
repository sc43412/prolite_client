import { Toggle } from "./toggle";
import { Actions } from "./actions";
import { Logo } from "./logo";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white h-[58px] z-[49] px-2 lg:px-6 flex justify-between items-center shadow-sm">
      <div className="flex items-center justify-between gap-x-2">
        <Toggle />
        <Logo />
      </div>
      <Actions />
    </nav>
  );
};
