import React from "react";
import styles from "../styles";
import CartItems from "./CartItems";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ShopContext from "../context/ShopContext";

const Cart = ({ showAlert }) => {
  const navigate = useNavigate();
  const context = useContext(ShopContext);
  const { fetchOrders, cartItems } = context;
  const navigateToCheckOut = () => {
    navigate("/checkout");
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (cartItems) {
      if (cartItems.length > 0) {
        setLoading(false);
      }
    }
  }, [cartItems]);
  return (
    <section
      id="card"
      className={`${styles.cart} text-white fixed ${context.cart ? "cart-in" : "cart-out"}`}
    >
      <div className="cartTab flex flex-col h-full">
        <h1 className={`p-[20px] font-300 font-poppins text-[40px] `}>
          Shopping Cart
        </h1>
        <div className="listCart flex-grow overflow-auto w-[100%] ">
          {loading
            ? ""
            : [...cartItems].reverse().map((item) => {
                return (
                  <CartItems
                    showAlert={showAlert}
                    key={item._id}
                    oid={item._id}
                    pid={item.productId}
                    name={item.productName}
                    quantity={item.quantity}
                    price={item.totalPrice}
                    image={item.image}
                  />
                );
              })}
        </div>
        <div className="btn-container">
          <button className="close-btn" onClick={() => context.setCart(false)}>
            Close
          </button>
          <button className="checkOut-btn" onClick={navigateToCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
