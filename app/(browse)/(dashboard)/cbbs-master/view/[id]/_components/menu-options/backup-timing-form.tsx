"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { fakePromise } from "@/app/(browse)/(auth)/_components/login-form";

const formSchema = z.object({
  timer: z.coerce.number().min(1, "Field is required"),
});

export const BackupTimingForm = ({ cbs_id }: { cbs_id: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timer: 30,
    },
  });

  const {
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fakePromise(3000).then(() => {
      toast.success("Backup Timer set");
    });
  }

  return (
    <Form {...form}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row-reverse relative items-center"
      >
        <FormField
          control={form.control}
          name="timer"
          render={({ field }) => (
            <FormItem className="space-y-0 h-fit">
              <FormMessage className="relative -top-1 lg:-top-5 -left-4 lg:left-8 lg:absolute text-nowrap" />
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  type="number"
                  mins
                  min={1}
                  className="h-[33px] w-[77px] font-semibold text-[13px] shrink rounded-[8px] border-2 placeholder:text-primary bg-white lg:bg-transparent text-primary"
                  placeholder="30"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting || isSubmitSuccessful}
          variant="link"
          className="text-xs"
        >
          {isSubmitting ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Set Backup Timing"
          )}
        </Button>
      </form>
    </Form>
  );
};
