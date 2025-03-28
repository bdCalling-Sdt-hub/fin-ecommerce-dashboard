// import Cookies from "universal-cookie";
import { baseApi } from "../baseApi";

// const cookie = new Cookies();
// const accessToken = cookie.get("accessToken");

// const accessToken = localStorage.getItem('accessToken');
// console.log('accessToken admin', accessToken);

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllContactUsers: builder.query({
      query: () => ({
        url: "/contact",
        method: "GET",
        // body: data,
        // headers: {
        //   "content-type": "application/json",
        // },
      }),
      providesTags: ["contact"],
    }),

    deleteContactUsers: builder.mutation({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
        // body: data,
        // headers: {
        //   "content-type": "application/json",
        // },
      }),
      providesTags: ["contact"],
    }),
   
  }),
});

export const { useDeleteContactUsersMutation, useGetAllContactUsersQuery } =
contactApi;
