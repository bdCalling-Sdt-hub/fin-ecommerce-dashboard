import { baseApi } from "../baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation({
      query: (data) => ({
        url: "/task/sign-in",
        method: "POST",
        body: data,
        headers: {
          "content-type": "application/json",
        },
      }),
      invalidatesTags: ["task"],
    }),
    SingleTask: builder.query({
      query: (id) => ({
        url: `/task/${id}`,
        method: "GET",
      }),
      providesTags: ["task"],
    }),

    getAllTasks: builder.query({
      query: () => ({
        url: "/task",
        method: "GET",
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `${accessToken}`,
        // },
      }),
      providesTags: ["task"],
    }),

    // admin tasks assign cencel and get pending task

    getAllPendingPaymentTask: builder.query({
      query: () => ({
        url: "/task?taskStatus=pending",
        method: "GET",
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `${accessToken}`,
        // },
      }),
      providesTags: ["task"],
    }),
    getAllTasksRequests: builder.query({
      query: () => ({
        url: "/task/admin/task-requiest",
        method: "GET",
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `${accessToken}`,
        // },
      }),
      providesTags: ["task"],
    }),

    acceptTasksRequest: builder.mutation({
      query: (id) => {
        console.log("accept task id", id);
        return {
          url: `/task/task-conform/${id}`,
          method: "PUT",
          // headers: {
          //   "content-type": "application/json",
          //   Authorization: `${accessToken}`,
          // },
        };
      },
      invalidatesTags: ["task"],
    }),

    cencelTasksRequest: builder.mutation({
      query: (id) => ({
        url: `/task/task-cencel/${id}`,
        method: "PUT",
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `${accessToken}`,
        // },
      }),
      invalidatesTags: ["task"],
    }),

    // task payment all get

    getAllTasksPayment: builder.query({
      query: () => ({
        url: "/payment",
        method: "GET",
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `${accessToken}`,
        // },
      }),
      // providesTags: ["task"],
    }),

    // withdraw requested admin
    getAllPendingWithdraw: builder.query({
      query: () => ({
        url: "/withdraw?status=pending",
        method: "GET",
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `${accessToken}`,
        // },
      }),
      providesTags: ["withdraw"],
    }),

    getAllConformWithdraw: builder.query({
      query: () => ({
        url: "/withdraw?status=paid",
        method: "GET",
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `${accessToken}`,
        // },
      }),
      providesTags: ["withdraw"],
    }),

    adminConformWithdraw: builder.mutation({
      query: ({ id, data }) => ({
        url: `/withdraw/admin-approved/${id}`,
        method: "POST",
        body: data,
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `${accessToken}`,
        // },
      }),
      invalidatesTags: ["withdraw"],
    }),
    // getNotifications: builder.query({
    //   query: () => {
    //     const accessToken = localStorage.getItem("accessToken");
    //     console.log(accessToken);
    //     if (!accessToken) {
    //       console.error("Access token not found.");
    //     }
    //     return {
    //       url: "/notification/admin-all",
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     };
    //   },
    //   providesTags: ["notification"],
    // }),
  }),
});

export const {
  useGetAllTasksQuery,
  useAddTaskMutation,
  useSingleTaskQuery,
  useGetAllTasksRequestsQuery,
  useGetAllPendingPaymentTaskQuery,
  useAcceptTasksRequestMutation,
  useCencelTasksRequestMutation,
  useGetAllTasksPaymentQuery,
  useGetAllPendingWithdrawQuery,
  useGetAllConformWithdrawQuery,
  useAdminConformWithdrawMutation,
  // useGetNotificationsQuery,
} = dashboardApi;
