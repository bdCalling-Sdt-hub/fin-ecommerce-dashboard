import { baseApi } from "../baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: (data) => {
        const accessToken = localStorage.getItem("accessToken");
        console.log({ accessToken });

        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: "/users/all-users",
          method: "GET",
          body: data,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["users"],
    }),
  }),
});

export const { useAllUsersQuery } = usersApi;
