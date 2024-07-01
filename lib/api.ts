import fetcher from "./fetcher";

interface NextOptions {
  revalidate?: number | undefined;
  tags?: string[];
}

// GET request
export const getRequest = async (
  url: string,
  next?: NextOptions
): Promise<any> => {
  return fetcher(url, { method: "GET", next });
};

// POST request
export const postRequest = async (
  url: string,
  body?: any,
  next?: NextOptions
): Promise<any> => {
  return fetcher(url, {
    method: "POST",
    body: JSON.stringify(body),
    next,
  });
};

// PATCH request
export const patchRequest = async (url: string, body: any): Promise<any> => {
  return fetcher(url, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
};

// DELETE request
export const deleteRequest = async (url: string): Promise<any> => {
  return fetcher(url, { method: "DELETE" });
};
