import { baseApi } from "../baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders/",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/status/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          "Content-type": "application/json",
        },
        invalidatesTags: ["updateOrder"],
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery, useUpdateOrderStatusMutation } = orderApi;
