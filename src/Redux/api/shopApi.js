// import Cookies from "universal-cookie";
import { baseApi } from "../baseApi";

// const cookie = new Cookies();
// const accessToken = cookie.get("accessToken");

// const accessToken = localStorage.getItem('accessToken');
// console.log('accessToken admin', accessToken);

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUniqueProducts: builder.query({
      query: () => ({
        url: "/product-info/",
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/product-info/add-products",
        method: "POST",
        body: formData,
        headers: {
          "Content-type": "multipart/form-data",
        },
        invalidatesTags: ["products"],
      }),
    }),
    editProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product-info/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          "Content-type": "multipart/form-data",
        },
        invalidatesTags: ["editProduct"],
      }),
    }),
  }),
});





export const {
  useGetUniqueProductsQuery,
  useGetAllProductsQuery,
  useCreateProductMutation,
  useEditProductMutation,
} = shopApi;
