"use client";

import { login } from "@/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(72, { message: "Password cannot exceed 72 characters." }),
});

export const fakePromise = (timer: number, error: boolean = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) return reject(new Error("Promise rejected"));
      resolve("Promise resolved");
    }, timer);
  });
};

export function LoginForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    setError,
    formState: { isSubmitting, errors },
  } = form;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    // await fakePromise(3000);
    await login({ email: values.email, password: values.password }).then(
      (res) => {
        if (res?.error) {
          setError("root.serverError", { message: res.error });
        }
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8 w-[300px]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Login" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input password placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errors?.root?.serverError && (
            <FormMessage className="!mt-1 ml-1">
              {errors?.root?.serverError.message}
            </FormMessage>
          )}
        </div>
        <div className="flex justify-between items-center !mt-6">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms2" />
            <label
              htmlFor="terms2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full !mt-4">
          {isSubmitting ? <LoaderCircle className="animate-spin" /> : "Login"}
        </Button>
      </form>
    </Form>
  );
}
