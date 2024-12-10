import { baseApi } from "../baseApi";

const accessToken = localStorage.getItem("authToken");
console.log(accessToken);

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allSubscriptionPlans: builder.query({
      query: () => ({
        url: "/subscriptionsplans/",
        method: "GET",
      }),
      providesTags: ["subscription"],
    }),
    createSubscription: builder.mutation({
      query: (data) => ({
        url: "/subscriptionsplans/create-plan",
        method: "POST",
        body: data,
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `Bearer ${accessToken}`,
        // },
        invalidatesTags: ["subscription"],
      }),
    }),
    editSubscription: builder.mutation({
      query: ({ id, data }) => {
        console.log("Editing subscription with ID:", id); // Log the ID
        return {
          url: `/subscriptionsplans/${id}`,
          method: "PATCH",
          body: data,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          invalidatesTags: ["subscription"],
        };
      },
    }),

    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `/subscriptionsplans/db/${id}`,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        invalidatesTags: ["subscription"],
      }),
    }),
  }),
});

export const {
  useAllSubscriptionPlansQuery,
  useCreateSubscriptionMutation,
  useEditSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionApi;
