"use server";

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { isTokenExpired } from "./lib/token";
import { toast } from "sonner";

export default async function revalidate(
  type: "path" | "tag",
  collection?: string,
  path?: string
) {
  if (type === "path") revalidatePath(path ?? "");
  if (type === "tag") revalidateTag(collection ?? "");
}

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (
    session.isLoggedIn &&
    session.accessToken &&
    isTokenExpired(session.accessToken)
  ) {
    toast.error("Session expired, please login again");
    session.destroy();
    redirect("/");
  }

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};

export const login = async (formData: { email: string; password: string }) => {
  const session = await getSession();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/client/user/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
  );
  const user = await res.json();

  if (res.ok && user.success) {
    session.email = user.data.email;
    session.accessToken = user.data.accessToken;
    session.isLoggedIn = true;

    await session.save();
    redirect("/dashboard");
  } else {
    return {
      error: "Invalid credentials",
    };
  }
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};
