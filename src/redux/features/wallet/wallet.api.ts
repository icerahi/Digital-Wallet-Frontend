import { baseApi } from "@/redux/baseApi";

const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myWallet: builder.query({
      query: () => ({
        url: "/wallets/me",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),
  }),
});

export const { useMyWalletQuery, useLazyMyWalletQuery } = walletApi;
