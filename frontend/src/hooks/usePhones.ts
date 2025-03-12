import useSWR from "swr";
import { ApiResponse, Phone } from "@/types";
import { fetcher } from "./api";

export function usePhones() {
  const { data, error, isLoading } = useSWR<ApiResponse<Phone[]>>(
    "/api/phones",
    fetcher
  );

  return {
    phones: data?.data,
    isLoading,
    error,
  };
}
