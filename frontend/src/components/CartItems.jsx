import React, { useContext } from "react";
import { plus, minus } from "../assets";
import ShopContext from "../context/ShopContext";

const CartItems = ({ oid, pid, name, quantity, price, image, showAlert }) => {
  const context = useContext(ShopContext);
  const { editOrder, removeOrder } = context;
  const increaseQuantity = async (oid, quantity) => {
    const response = await editOrder(oid, quantity + 1);
  };
  const decreaseQuantity = async (oid, quantity) => {
    console.log(quantity - 1);
    if (quantity - 1 <= 0) {
      const response = await removeOrder(oid);
      if (response.success == true) {
        showAlert("Item removed", "success");
      } else {
        showAlert("Something went wrong!!", "error");
      }
    } else {
      const response = await editOrder(oid, quantity - 1);
    }
  };
  return (
    <>
      <div className="items-in-cart">
        <div className="image h-[50px] w-[50px]">
          <img
            src={`${process.env.REACT_APP_SERVER}/api/image/${image}`}
            alt="#"
            className="object-contain w-[100%] h-[100%] "
          />
        </div>
        <div className=" text-left text-[13px] font-poppins leading-5">
          {name}
        </div>
        <div className="text-[14px] font-poppins">${price}</div>
        <div className="quantity flex ">
          <div
            className="plus w-[30px] h-[30px] flex items-center justify-center hover:opacity-50"
            onClick={() => {
              increaseQuantity(oid, quantity);
            }}
          >
            <img src={plus} alt="#" className="h-[90%] w-[90%]" />
          </div>
          <div className="plus w-[30px] h-[30px] flex items-center justify-center text-[14px]">
            {quantity}
          </div>
          <div
            className="plus w-[30px] h-[30px] flex items-center justify-center hover:opacity-50"
            onClick={() => {
              decreaseQuantity(oid, quantity);
            }}
          >
            <img src={minus} className="h-[90%] w-[90%]" alt="#" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItems;
