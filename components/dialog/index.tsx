"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ManualForm } from "@/app/(browse)/(dashboard)/cbbs-master/view/[id]/_components/menu-options/auto-test/manual-form";
import { ElementRef, useRef } from "react";
import { ScheduleForm } from "@/app/(browse)/(dashboard)/cbbs-master/view/[id]/_components/menu-options/auto-test/schedule-form";

interface ModalDialogProps {
  children: React.ReactNode;
  manual: boolean;
}

export function ModalDialog({ children, manual }: ModalDialogProps) {
  const closeRef = useRef<ElementRef<"button">>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{manual ? "Manual" : "Schedule"} Auto-test</DialogTitle>
        </DialogHeader>
        {manual && <ManualForm closeRef={closeRef} />}
        {!manual && <ScheduleForm closeRef={closeRef} />}
        <DialogFooter className="sm:justify-start">
          <DialogClose ref={closeRef} asChild>
            <Button type="button" className="sr-only" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
