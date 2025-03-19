// import Cookies from "universal-cookie";

import { baseApi } from "../baseApi";

// const cookie = new Cookies();
// const accessToken = cookie.get("accessToken");

// const accessToken = localStorage.getItem('accessToken');
// console.log('accessToken admin', accessToken);

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/product",
        method: "GET",
      }),
      // providesTags: [""],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      // providesTags: [""],
    }),
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/product/add-product",
        method: "POST",
        body: formData,
        headers: {
          "Content-type": "multipart/form-data",
        },
        // invalidatesTags: [""],
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        // invalidatesTags: [""],
      }),
    }),
    deletedProductImageColor: builder.mutation({
      query: ({id, data}) => ({
        url: `/product/image/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          "Content-type": "application/json",
        },
        // invalidatesTags: [""],
      }),
    }),
    updateProduct: builder.mutation({
      query: ({id, data}) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          "Content-type": "multipart/form-data",
        },
        // invalidatesTags: [""],
      }),
    }),
    updateProductFaqSizeMaterial: builder.mutation({
      query: ({id, data}) => ({
        url: `/product/faq-size-material/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          "Content-type": "application/json",
        },
        // invalidatesTags: [""],
      }),
    }),
  }),
});





export const {
    useGetAllProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useGetSingleProductQuery,
    useUpdateProductMutation,
    useUpdateProductFaqSizeMaterialMutation,
    useDeletedProductImageColorMutation
} = productsApi;
