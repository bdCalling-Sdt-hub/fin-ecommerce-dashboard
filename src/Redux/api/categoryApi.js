// import Cookies from "universal-cookie";
import { baseApi } from "../baseApi";

// const cookie = new Cookies();
// const accessToken = cookie.get("accessToken");

// const accessToken = localStorage.getItem('accessToken');
// console.log('accessToken admin', accessToken);

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
        // body: data,
        // headers: {
        //   "content-type": "application/json",
        // },
      }),
      providesTags: ["user"],
    }),
    createCategory: builder.mutation({
      query: (formData) => ({
        url: "/categories/create-category",
        method: "POST",
        body: formData,
        // headers: {
        //   "Content-type": "application/json",
        //   Authorization: `Bearer ${accessToken}`,
        // },
        invalidatesTags: ["product"],
      }),
    }),
  }),
});

export const { useGetAllCategoryQuery, useCreateCategoryMutation } =
  categoryApi;
