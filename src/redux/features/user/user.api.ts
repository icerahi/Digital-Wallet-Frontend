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
  }),
});

export const {
  useUpdateUserInfoMutation,
  useChangePasswordMutation,
  useGetMeQuery,
  useGetAllUsersQuery,
} = userApi;
