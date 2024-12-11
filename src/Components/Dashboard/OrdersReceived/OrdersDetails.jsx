import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();
  const order = location.state;
  console.log(order);

  if (!order) {
    return <p>No data available</p>;
  }
  return (
    <div className="container mx-auto p-6">
      <div className=" ">
        {/* Image Section */}
        <div className="w-full md:w-1/2 p-4">
          <img
            src={`http://192.168.12.235:8008/${order.productInfoId.images[0]}`}
            alt="Order"
            className="rounded-lg shadow-lg w-[350px]"
          />
        </div>

        {/* Order Details Section */}
        <div className="w-full md:w-1/2 p-4">
          <h3 className="text-blue-500 font-semibold text-lg mb-4">
            Order details
          </h3>

          <div className="grid grid-cols-2 gap-4 text-gray-500 text-sm">
            <div className="flex justify-start items-center ">
              <p className="font-medium text-base mr-5 ">Product Name:</p>
              <span className="text-gray-900 text-base">
                {order.productInfoId.name ? order.productInfoId.name : "N/A"}
              </span>
            </div>
            {/* <div className="flex justify-start items-center ">
              <span className="font-medium text-base mr-5">
                Exact location:
              </span>
              <span className="text-gray-900 text-base">
                {order.deliveryLocation ? order.deliveryLocation : "N/A"}
              </span>
            </div> */}

            <div className="flex justify-start items-center ">
              <span className="font-medium text-base mr-5">Price:</span>
              <span className="text-gray-900 text-base">
                {order.productInfoId.price ? order.productInfoId.price : "N/A"}{" "}
                Fcfa
              </span>
            </div>
            <div className="flex justify-start items-center ">
              <span className="font-medium text-base mr-5">Customer:</span>
              <span className="text-gray-900 text-base">
                {" "}
                {order.customer ? order.customer : "N/A"}
              </span>
            </div>

            <div className="flex justify-start items-center ">
              <span className="font-medium text-base mr-5">
                Delivery costs:
              </span>
              <span className="text-gray-900 text-base">
                {order.deliveryCost} Fcfa
              </span>
            </div>
            <div className="flex justify-start items-center ">
              <span className="font-medium text-base mr-5">Order Status:</span>
              <span className="text-gray-900 text-base">
                {order.status ? order.status : "N/A"}
              </span>
            </div>

            <div className="flex justify-start items-center ">
              <span className="font-medium text-base mr-5">
                Delivery location:
              </span>
              <span className="text-gray-900 text-base">
                {order.deliveryLocation ? order.deliveryLocation : "N/A"}
              </span>
            </div>
            <div className="flex justify-start items-center ">
              <span className="font-medium text-base mr-5">Total amount:</span>
              <span className="text-blue-500 font-semibold">
                {" "}
                {order.totalAmount ? order.totalAmount : "N/A"} Fcfa
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
