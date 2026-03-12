import axios, { AxiosError, AxiosInstance } from "axios";
import { PeopleChartApiResponse } from "@/types";

/**
 * Axios instance pointing to our own Next.js API proxy.
 * This avoids CORS issues — the proxy calls worksync.global server-side.
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const data = error.response.data as { error?: string };
      const message = data?.error ?? `Request failed with status ${error.response.status}`;
      return Promise.reject(new Error(message));
    }
    if (error.request) {
      return Promise.reject(new Error("Network error – please check your connection."));
    }
    return Promise.reject(error);
  }
);

/**
 * Fetches the org chart via the local Next.js proxy route.
 */
export async function fetchPeopleChart(
  employeeId: number
): Promise<PeopleChartApiResponse> {
  const response = await apiClient.get<PeopleChartApiResponse>(
    `/org-chart?employeeId=${employeeId}`
  );
  return response.data;
}

export default apiClient;
