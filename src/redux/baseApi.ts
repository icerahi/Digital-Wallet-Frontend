import config from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl,
    credentials: "include",
  }),
  tagTypes: ["WALLET", "TRANSACTION", "USER"],
  endpoints: () => ({}),
});
