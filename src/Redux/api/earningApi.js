
import { baseApi } from "../baseApi";

const accessToken = localStorage.getItem("authToken");
console.log(accessToken);

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allEarnings: builder.query({
      query: () => ({
        url: "/payment?status=paid",
        method: "GET",
      })
    })
   
  }),
});

export const {
useAllEarningsQuery
} = earningApi;
