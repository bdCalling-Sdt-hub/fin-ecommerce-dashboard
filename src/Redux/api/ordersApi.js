import { baseApi } from "../baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/order",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/order/status/${id}?status=${data}`,
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        invalidatesTags: ["orders"],
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery, useUpdateOrderStatusMutation } = orderApi;
