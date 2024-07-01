"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fakePromise } from "@/app/(browse)/(auth)/_components/login-form";
import { LoaderCircle } from "lucide-react";
import { RefObject } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  time: z.string().min(1, {
    message: "Select a time",
  }),
});

interface ManualFormProps {
  closeRef: RefObject<HTMLButtonElement>;
}
export function ManualForm({ closeRef }: ManualFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      time: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values);

    const timeInMinutes = parseInt(values.time);
    const timeInSeconds = timeInMinutes * 60;

    const countdownPromise = new Promise<void>((resolve) => {
      let secondsRemaining = timeInSeconds;

      const interval = setInterval(() => {
        if (secondsRemaining > 0) {
          closeRef?.current?.click();
          const minutes = Math.floor(secondsRemaining / 60);
          const seconds = secondsRemaining % 60;
          toast.loading(
            `Time remaining: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
          );
          secondsRemaining--;
        } else {
          clearInterval(interval);

          resolve();
        }
      }, 1000);
    });

    toast.promise(countdownPromise, {
      loading: "Time remaining...",
      success: "Set Manual Auto-test successfully",
      error: "Error",
    });
  }

  return (
    <Form {...form}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-5 flex flex-col justify-between gap-10"
      >
        <div className="flex justify-between items-center lg:gap-x-20 h-[70px]">
          <FormLabel className="text-sm">Enter Time</FormLabel>
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="w-[150px] lg:w-[310px]">
                      <SelectValue placeholder="Select Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-x-5 !ml-auto">
          <Button
            onClick={() => closeRef?.current?.click()}
            type="reset"
            variant="outline"
            className="rounded-[5px] w-[130px] h-8 font-bold text-[13px] border"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-[5px] w-[130px] h-8 font-bold text-[13px]"
          >
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
