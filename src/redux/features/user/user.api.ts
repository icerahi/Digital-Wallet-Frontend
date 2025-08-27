import { baseApi } from "@/redux/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserInfo: builder.mutation({
      query: (payload) => ({
        url: "/users/update",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["USER"],
    }),

    changePassword: builder.mutation({
      query: (payload) => ({
        url: "/users/change-password",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: [],
    }),

    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    getAllUsers: builder.query({
      query: (params) => ({
        url: "/users/all-users",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),

    getSingleUser: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    suspendAgent: builder.mutation({
      query: (agentId) => ({
        url: `/users/suspend-agent/${agentId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    approveAgent: builder.mutation({
      query: (agentId) => ({
        url: `/users/approve-agent/${agentId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useUpdateUserInfoMutation,
  useChangePasswordMutation,
  useGetMeQuery,
  useGetAllUsersQuery,
  useSuspendAgentMutation,
  useApproveAgentMutation,
  useGetSingleUserQuery,
} = userApi;
