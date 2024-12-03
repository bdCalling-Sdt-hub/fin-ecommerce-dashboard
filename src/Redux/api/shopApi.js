// import Cookies from "universal-cookie";
import { baseApi } from "../baseApi";

// const cookie = new Cookies();
// const accessToken = cookie.get("accessToken");

// const accessToken = localStorage.getItem('accessToken');
// console.log('accessToken admin', accessToken);

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
        // body: data,
        // headers: {
        //   "content-type": "application/json",
        // },
      }),
      providesTags: ["products"],
    }),
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/products/create-product",
        method: "POST",
        body: formData,
        headers: {
          "Content-type": "multipart/form-data",
        },
        invalidatesTags: ["products"],
      }),
    }),
  }),
});

export const { useGetAllProductsQuery, useCreateProductMutation } = shopApi;
