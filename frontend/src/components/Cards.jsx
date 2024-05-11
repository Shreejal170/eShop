import React, { useContext, useEffect } from "react";
import ShopContext from "../context/ShopContext";
import { useNavigate } from "react-router";

const Cards = (props) => {
  const {
    product_name,
    actual_price,
    given_price,
    discount_rate,
    image,
    id,
    showAlert,
  } = props;
  const context = useContext(ShopContext);
  const { placeOrder, cartItems } = context;
  const navigate = useNavigate();
  const navSeeDetials = () => {
    console.log("Click Registered for id:", id);
    navigate(`/user/productdetails/${id}`);
    // window.location.href = `/product/${product_name}`;
  };
  const addItemToCart = async (id) => {
    const isItemInCart = cartItems.some((item) => item.productId == id);

    if (isItemInCart) {
      showAlert("Item is already in the cart.", "error");
      return true;
    }

    const response = await placeOrder(id);
    if (response.productId) {
      showAlert("Successfully Added To Cart", "success");
    } else {
      showAlert("Failed to add to cart", "error");
    }
  };

  return (
    <div className="w-[325px] h-[450px] bg-black-gradient mt-4 flex flex-col justify-center items-center gap-6 card rounded-md">
      <div className="w-[268px] h-[158px] ">
        <img
          src={`${process.env.REACT_APP_SERVER}/api/image/${image}`}
          alt={product_name}
          className="w-[100%] h-[100%] object-contain"
        />
      </div>
      <div className="h-[1px] w-[80%] border-t-2 border-white "></div>
      <div id="title-card">
        <h2 className="text-[24px] font-poppins font-bold -tracking-tight ">
          {product_name}
        </h2>
      </div>
      <div id="info" className="text-center text-info font-poppins">
        Actual Price: ${actual_price}
        <br />
        Buy for: ${given_price}
        <br />
        Discount: {discount_rate}%
        <br />
      </div>
      <div id="card-buttons" className="flex gap-2 mt-2">
        <button
          className="card-button font-poppins rounded-[9px] text-[15px] "
          onClick={() => addItemToCart(id)}
        >
          Add to Cart
        </button>
        <button
          className="card-button font-poppins rounded-[9px] text-[15px] "
          onClick={navSeeDetials}
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default Cards;
