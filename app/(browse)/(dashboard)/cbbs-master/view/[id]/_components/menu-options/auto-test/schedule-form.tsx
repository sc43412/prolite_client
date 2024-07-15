"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import { DatePickerWithTime } from "@/components/date-picker/date-picker-time";
import { toast } from "sonner";
import { CBS_SCHEDULED_AUTO_TEST } from "@/endpoints";
import { postRequest } from "@/lib/api";

const formSchema = z.object({
  startDate: z.string().min(1, {
    message: "Select a time",
  }),
  interval: z.string().min(1, {
    message: "Select a time",
  }),
  timeLimit: z.string().min(1, {
    message: "Select a time",
  }),
});

interface ScheduleFormProps {
  closeRef: RefObject<HTMLButtonElement>;
  cbs_id : string;
}

export function ScheduleForm({ closeRef,cbs_id }: ScheduleFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: "",
      interval: "",
      timeLimit: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values);

    await postRequest(
      CBS_SCHEDULED_AUTO_TEST,
      {
        
       
        start_date : values.startDate,
        interval : Number(values.interval),
        time_limit : Number(values.timeLimit),
        cbs_id : cbs_id,
      }
    )

    await fakePromise(3000).then(() => {
      closeRef?.current?.click();
      toast.success("Scheduled Auto-test successfully");
    });
  }

  return (
    <Form {...form}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-5 flex flex-col justify-between"
      >
        <div className="flex flex-col justify-evenly gap-y-5 mb-10">
          <div className="flex justify-between items-center lg:gap-x-20">
            <FormLabel className="text-sm">Start Date</FormLabel>
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePickerWithTime field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between items-center lg:gap-x-20">
            <FormLabel className="text-sm">Interval</FormLabel>
            <FormField
              control={form.control}
              name="interval"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="w-[150px] lg:w-[310px]">
                        <SelectValue placeholder="15 Days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between items-center lg:gap-x-20">
            <FormLabel className="text-sm">Time Limit</FormLabel>
            <FormField
              control={form.control}
              name="timeLimit"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="w-[150px] lg:w-[310px]">
                        <SelectValue placeholder="10 mins" />
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
              "Schedule"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
