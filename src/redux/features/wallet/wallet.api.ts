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
    getAllWallets: builder.query({
      query: (params) => ({
        url: "/wallets/all",
        method: "GET",
        params,
      }),
      providesTags: ["WALLET"],
    }),

    getSingleWallet: builder.query({
      query: (walletId) => ({
        url: `/wallets/${walletId}`,
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),

    depositMoney: builder.mutation({
      query: (payload) => ({
        url: "/wallets/add-money",
        method: "POST",
        body: { sender: payload.source, amount: payload.amount },
      }),
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),
    withdrawMoney: builder.mutation({
      query: (payload) => ({
        url: "/wallets/withdraw-money",
        method: "POST",
        body: { receiver: payload.source, amount: payload.amount },
      }),
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),
    sendMoney: builder.mutation({
      query: (payload) => ({
        url: "/wallets/send-money",
        method: "POST",
        body: { receiver: payload.source, amount: payload.amount },
      }),
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),
    cashIn: builder.mutation({
      query: (payload) => ({
        url: "/wallets/cash-in",
        method: "POST",
        body: { receiver: payload.source, amount: payload.amount },
      }),
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),
    cashOut: builder.mutation({
      query: (payload) => ({
        url: "/wallets/cash-out",
        method: "POST",
        body: { sender: payload.source, amount: payload.amount },
      }),
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),

    blockWallet: builder.mutation({
      query: (walletId) => ({
        url: `/wallets/block/${walletId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["WALLET"],
    }),
    unblockWallet: builder.mutation({
      query: (walletId) => ({
        url: `/wallets/unblock/${walletId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["WALLET"],
    }),
  }),
});

export const {
  useMyWalletQuery,
  useDepositMoneyMutation,
  useWithdrawMoneyMutation,
  useSendMoneyMutation,
  useCashInMutation,
  useCashOutMutation,
  useGetAllWalletsQuery,
  useBlockWalletMutation,
  useUnblockWalletMutation,
  useGetSingleWalletQuery,
} = walletApi;
