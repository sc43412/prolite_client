"use client";

import { Button } from "@/components/ui/button";
import View from "./view.svg";
import Image from "next/image";
import { Hint } from "@/components/hint";
import Link from "next/link";

interface TaskViewButtonProps {
  cbs_id: string;
  path: string;
}

export const TaskViewButton = ({ cbs_id, path }: TaskViewButtonProps) => {
  const onClick = () => {};

  return (
    <Hint label="View" side="left" asChild>
      <Button onClick={onClick} variant="link" size="sm">
        <Link href={`/${path}/${cbs_id}`}>
          <Image src={View} alt="task-view" />
        </Link>
      </Button>
    </Hint>
  );
};
