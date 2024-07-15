import { getSession } from "@/actions";
import { toast } from "sonner";

const fetcher = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const session = await getSession();

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (session.isLoggedIn && session.accessToken) {
    defaultHeaders["Authorization"] = `Bearer ${session.accessToken}`;
  } else {
    toast.error("Access denied");
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}${url}`,
    config
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }


  const data = await response.json();

  if (!data?.success) {
    throw new Error(data.message || "Request failed with no error message");
  }

  return data.data;
};

export default fetcher;
