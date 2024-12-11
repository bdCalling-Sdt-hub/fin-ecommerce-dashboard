import UserTable from "../Tables/UserTable";
import { InfoCard } from "../Chart/DashboardChart";
import { NavLink } from "react-router-dom";
import { useAllUsersQuery } from "../../Redux/api/usersApi";
import { useGetAllProductsQuery } from "../../Redux/api/shopApi";
import { useGetAllOrdersQuery } from "../../Redux/api/ordersApi";

const Dashboard = () => {
  const { data: allUser } = useAllUsersQuery();
  const { data: allProducts } = useGetAllProductsQuery();
  const { data: allOrders } = useGetAllOrdersQuery();

  // console.log(allUser?.data);
  // console.log("allProducts", allProducts?.data);
  // console.log("allOrders", allOrders?.data.result);

  const userCount = allUser?.data.length;
  const productCount = allProducts?.data.length;
  const ordersCount = allOrders?.data.result.length;
  console.log(userCount);
  console.log(productCount);
  console.log(ordersCount);
  // const onGoingTasks = Array.isArray(tasks?.data) ? tasks?.data?.filter(task => task.taskStatus === "onGoing") : [];
  // const {data:workers} = useGetAllWorkerQuery();
  // const {data:providers} = useGetAllProviderQuery();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error loading tasks: {error.message}</div>;
  // }

  return (
    <div className="w-full p-5 lg:p-10">
      {/* Overview Section */}
      <div className="flex flex-col gap-6 mb-10">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#3399ff] mb-1">
          Overview
        </h1>

        {/* Adjusting the layout for better responsiveness */}
        <div className="flex items-center gap-10">
          <InfoCard title="Users" value={userCount} color="bg-blue-400" />
          <InfoCard
            title="Products"
            value={productCount}
            color="bg-purple-400"
          />
          <InfoCard
            title="Orders Received"
            value={ordersCount}
            color="bg-green-400"
          />
          <InfoCard
            title="Premium Subscribers"
            value="25"
            color="bg-purple-300"
          />
        </div>
      </div>

      {/* Bottom Section (User Table & Earnings Chart) */}
      <div className="flex flex-col lg:flex-row gap-3 mt-5">
        <div className="lg:flex-1">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg lg:text-xl font-bold text-[#3399ff] mb-1">
              Recent users
            </p>
            <NavLink to="/users">
              <p className="text-sm lg:text-base text-[#3399ff] underline font-bold">
                View All
              </p>
            </NavLink>
          </div>
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
