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
    getAllTransactions: builder.query({
      query: (params) => ({
        url: "/transactions/all",
        method: "GET",
        params,
      }),
      providesTags: ["TRANSACTION"],
    }),
    getSingleTransaction: builder.query({
      query: (transactionId) => ({
        url: `/transactions/${transactionId}`,
        method: "GET",
      }),
      providesTags: ["TRANSACTION"],
    }),
  }),
});

export const {
  useMyTransactionQuery,
  useGetAllTransactionsQuery,
  useGetSingleTransactionQuery,
} = transactionApi;
