import { baseApi } from "../baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEarnings: builder.query({
      query: (data) => ({
        url: `/payment/all-income-rasio?year=${data}`,
        method: "GET",
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `${accessToken}`,
        // },
      }),
      providesTags: ["payment"],
    }),


  }),
});

export const {
useGetAllEarningsQuery
} = dashboardApi;
