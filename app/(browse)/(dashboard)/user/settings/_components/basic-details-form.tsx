"use client";

import { fakePromise } from "@/app/(browse)/(auth)/_components/login-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be alteast 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export function BasicDetailsForm({
  client,
}: {
  client: { userName: string; email: string };
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: client.userName || "",
      email: client.email || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    await fakePromise(3000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-[70vh]">
        <div className="flex flex-col justify-between h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 md:w-5/6 mt-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#20DF7F] text-base">
                    Profile Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder="Enter Name"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#20DF7F] text-base">
                    Email ID
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder="Enter Email ID"
                      disabled
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="outline"
              className="text-[#ED553B] border-[#ED553B] flex items-center justify-between mt-3 text-base font-normal"
            >
              Change Password <ChevronRight />
            </Button>
          </div>
          <div className="mx-auto md:mx-0 md:ml-auto flex gap-x-10">
            <Button
              type="submit"
              variant="outline"
              className="w-[130px] !mt-4 text-[#ED553B] border-[#ED553B]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-[130px] !mt-4 bg-[#ED553B] hover:bg-[#ED553B]/90 rounded-[5px]"
            >
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
