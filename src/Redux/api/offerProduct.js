// import Cookies from "universal-cookie";

import { baseApi } from "../baseApi";

// const cookie = new Cookies();
// const accessToken = cookie.get("accessToken");

// const accessToken = localStorage.getItem('accessToken');
// console.log('accessToken admin', accessToken);

const offerProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProductOffers: builder.query({
      query: () => ({
        url: "/offer",
        method: "GET",
      }),
      // providesTags: ["offers"],
    }),
    createOffer: builder.mutation({
      query: (formData) => ({
        url: "/offer/add-offer",
        method: "POST",
        body: formData,
        headers: {
          "Content-type": "application/json",
        },
        // invalidatesTags: ["offers"],
      }),
    }),
    deleteOffer: builder.mutation({
      query: (id) => ({
        url: `/offer/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        // invalidatesTags: ["offers"],
      }),
    }),
  }),
});





export const {
  useGetAllProductOffersQuery,
  useCreateOfferMutation,
  useDeleteOfferMutation
} = offerProductApi;
