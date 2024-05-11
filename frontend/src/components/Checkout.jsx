import React, { useContext, useEffect, useState } from "react";
import styles from "../styles";
import { success } from "../assets";
import ShopContext from "../context/ShopContext";

const Title = () => {
  return (
    <div className="w-full max-w-[500px] flex flex-row border-1  border-gray-400 sm:text-[15px] text-[13px] h-[40px] mt-3 animation3">
      <div className="border border-1 flex justify-center border-gray-400 px-1 text-center w-[15%]">
        Image
      </div>
      <div className="border border-1 border-gray-400 px-1 text-center flex-1">
        Name
      </div>
      <div className="border border-1 border-gray-400 w-[11%] px-1 text-center">
        Price
      </div>
      <div className="border border-1 border-gray-400 w-[18%] px-1 text-center">
        Quantity
      </div>
      <div className="border border-1 border-gray-400 w-[13%] px-1 text-center ">
        Total
      </div>
    </div>
  );
};

const Chart = ({ image, name, price, quantity, total }) => {
  return (
    <>
      <div className="w-full max-w-[500px] flex flex-row border-1 border-gray-400 sm:text-[15px] text-[13px] h-[40px] animation3">
        <div className="border border-1 flex items-center justify-center border-gray-400 px-1 text-center w-[15%]">
          <div className="w-[80%] h-[80%]">
            <img
              src={`${process.env.REACT_APP_SERVER}/api/image/${image}`}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="border border-1 border-gray-400 px-1 text-center flex-1">
          {name}
        </div>
        <div className="border border-1 border-gray-400 w-[11%] px-1 text-center">
          {price}
        </div>
        <div className="border border-1 border-gray-400 w-[18%] px-1 text-center">
          {quantity}
        </div>
        <div className="border border-1 border-gray-400 w-[13%] px-1 text-center">
          {total}
        </div>
      </div>
    </>
  );
};

const CheckOut = () => {
  const context = useContext(ShopContext);
  const { checkOutOrders, setCartItems } = context;
  const [allOrders, setAllOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serious, setSerious] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await checkOutOrders();
      setAllOrders(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allOrders) {
      if (allOrders.orderDetails.length > 0) {
        setLoading(false);
        setSerious(true);
      } else {
        setLoading(false);
        setSerious(false);
      }
    }
  }, [allOrders]);

  return (
    <>
      {loading ? (
        <div className="text-white"></div>
      ) : (
        <>
          <section
            id="checkout"
            className="bg-primary w-full md:p-0 p-5 text-white"
          >
            <div className="flex flex-col justify-center items-center font-poppins md:p-5 p-0 text-white  w-full">
              <div className="icon w-[250px] h-[250px] animation1">
                <img src={success} className="w-[100%] h-[100%] object-cover" />
              </div>
              {serious ? (
                <>
                  <h2
                    className={`font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[55.8px] w-full text-center animation2`}
                  >
                    Successfully <br /> Placed Order
                  </h2>
                  <h2 className="text-center mt-3 text-[30px] animation3">
                    Your Orders
                  </h2>
                  <Title />
                  {allOrders.orderDetails.map((order) => {
                    return (
                      <Chart
                        image={order.image}
                        name={order.productName}
                        price={order.price}
                        quantity={order.quantity}
                        total={order.totalPrice}
                      />
                    );
                  })}
                  <div className="text-right mt-2 w-full max-w-[500px] animation3">
                    Total: ${allOrders.total}
                  </div>
                  <div className="text-right mt-2 w-full max-w-[500px] animation3">
                    Delivery Date: At night, when the sun shines.
                  </div>
                </>
              ) : (
                <h2
                  className={`font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[55.8px] w-full text-center animation3`}
                >
                  Nothing will be <br /> Delivered to you soon
                </h2>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default CheckOut;
