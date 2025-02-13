// import Cookies from "universal-cookie";
import { baseApi } from "../baseApi";

// const cookie = new Cookies();
// const accessToken = cookie.get("accessToken");

// const accessToken = localStorage.getItem('accessToken');
// console.log('accessToken admin', accessToken);

const offerProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOffers: builder.query({
      query: () => ({
        url: "/offer",
        method: "GET",
      }),
      providesTags: ["offers"],
    }),
    createOffer: builder.mutation({
      query: (formData) => ({
        url: "/offer/add-offer",
        method: "POST",
        body: formData,
        headers: {
          "Content-type": "multipart/form-data",
        },
        invalidatesTags: ["offers"],
      }),
    }),
    deleteOffer: builder.mutation({
      query: (id) => ({
        url: `/offer/${id}`,
        method: "DELETE",
        body: data,
        headers: {
          "Content-type": "multipart/form-data",
        },
        invalidatesTags: ["offers"],
      }),
    }),
  }),
});





export const {
  useGetAllOffersQuery,
  useCreateOfferMutation,
  useDeleteOfferMutation
} = offerProductApi;
