import { baseApi } from "@/redux/baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myTransaction: builder.query({
      query: (params) => ({
        url: "/transactions/me",
        method: "GET",
        params,
      }),
      providesTags: ["TRANSACTION"],
    }),
  }),
});

export const { useMyTransactionQuery } = transactionApi;
