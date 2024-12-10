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
      query: ({ id, data }) => {
        console.log("Editing Status with ID:", id);
        return {
          url: `/orders/status/${id}`,
          method: "PATCH",
          body: data,
          invalidatesTags: ["updateOrder"],
        };
      },
    }),
  }),
});

export const { useGetAllOrdersQuery, useUpdateOrderStatusMutation } = orderApi;
