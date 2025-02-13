// import Cookies from "universal-cookie";
import { baseApi } from "../baseApi";

// const cookie = new Cookies();
// const accessToken = cookie.get("accessToken");

// const accessToken = localStorage.getItem('accessToken');
// console.log('accessToken admin', accessToken);

const subcribsUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscribsUsers: builder.query({
      query: () => ({
        url: "/subscribe",
        method: "GET",
        // body: data,
        // headers: {
        //   "content-type": "application/json",
        // },
      }),
      providesTags: ["subcribsUser"],
    }),

    deleteSubscribsUsers: builder.mutation({
      query: (id) => ({
        url: `/subscribe/${id}`,
        method: "DELETE",
        // body: data,
        // headers: {
        //   "content-type": "application/json",
        // },
      }),
      providesTags: ["subcribsUser"],
    }),
   
  }),
});

export const { useGetAllSubscribsUsersQuery, useDeleteSubscribsUsersMutation } =
subcribsUserApi;
