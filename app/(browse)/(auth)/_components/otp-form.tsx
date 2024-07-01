"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LoaderCircle } from "lucide-react";
import { fakePromise } from "./login-form";
// import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  pin: z.string().min(4, {
    message: "Please enter a 4 digit pin",
  }),
});

export function InputOTPForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const {
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  const [timer, setTimer] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendEnabled(true);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const resendOTP = async () => {
    await fakePromise(3000);
    setTimer(60);
    setIsResendEnabled(false);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });

    await fakePromise(3000);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[300px]"
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="space-y-0 mx-auto w-fit">
              <FormControl>
                <InputOTP maxLength={4} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage className="!mt-2" />
            </FormItem>
          )}
        />

        {isSubmitSuccessful && (
          <span className="text-[#12B65D] text-xs font-medium ml-2">
            OTP Verified!
          </span>
        )}

        <Button
          disabled={isSubmitting || isSubmitSuccessful}
          type="submit"
          className="w-full !mt-10"
        >
          {isSubmitting ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Reset Password"
          )}
        </Button>
        <div className="flex justify-between items-center !mt-2 text-sm">
          <span>{`00:${timer.toString().padStart(2, "0")}`}</span>
          <Button
            type="button"
            variant="link"
            className="p-0 h-fit"
            onClick={resendOTP}
            disabled={!isResendEnabled}
          >
            Resend OTP
          </Button>
        </div>
      </form>
    </Form>
  );
}
