import React, { useEffect, useState, useContext } from "react";
import { layout } from "../styles";
import { iPhone } from "../productImgs";
import { useLocation, useParams, useNavigate } from "react-router";
import ShopContext from "../context/ShopContext";

const Specifications = ({ title, info }) => {
  return (
    <>
      <div className="flex flex-row">
        <div className="w-[110px] text-white border sm:text-[20px] text-[16px] px-2 text-right">
          {title}
        </div>
        <div className="flex-1 max-w-[400px]  text-teal-200 border sm:text-[20px] text-[16px] px-4">
          {info}
        </div>
      </div>
    </>
  );
};

const ProductDetails = ({ showAlert }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [button, setButton] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);
  const context = useContext(ShopContext);
  const {
    productDetail,
    getProductDetail,
    deleteProduct,
    placeOrder,
    cartItems,
  } = context;
  const [loading, setLoading] = useState(true);

  const deleteItem = async (id) => {
    const response = await deleteProduct(id);
    navigate("/seller");
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

  // console.log(`Id is ${id}`);
  useEffect(() => {
    if (!productDetail || productDetail.id !== id) {
      getProductDetail(id).then(() => {});
    }
  }, [id]);

  useEffect(() => {
    if (productDetail != null) {
      setLoading(false);
    }
  }, [productDetail]);

  useEffect(() => {
    if (location.pathname.includes("user")) {
      setButton(true);
      setDeleteButton(false);
    } else {
      setDeleteButton(true);
      setButton(false);
    }
  }, [location]);

  return (
    <>
      {loading ? (
        <div className="p-3 text-white mt-3">Loading...</div>
      ) : (
        <section
          id="product-details"
          className={`${layout.sectionSeller} ${button ? "bg-primary" : "bg-black"} text-white px-10 justify-center sm:items-start items-center min-h-[100vh]`}
        >
          <div className="w-[200px] h-auto min-h-[250px] max-w-[260px] bg-black-gradient rounded-xl outline p-3 outline-gray-300 flex items-center flex-col justify-around sm:mt-4">
            <div className="w-[170px] h-[130px]">
              <img
                src={`${process.env.REACT_APP_SERVER}/api/image/${productDetail.image}`}
                alt="product_image"
                className="object-contain w-[100%] h-[100%]"
              />
            </div>

            <div className="text-center mt-3 font-poppins mb-3 text-[20px] text-white">
              {productDetail.product_name}
            </div>
          </div>
          {/* Use Map */}
          <div className="product-detials flex-1 sm:ml-10 sm:mt-0 mt-10 max-w-[750px]">
            <div
              className={`font-poppins font-semibold xs:text-[48px] sm:text-[40px] text-[30px] text-teal-100 sm:leading-[76.8px] leading-[40.8px] w-full sm:text-start text-center`}
            >
              {productDetail.product_name}
            </div>
            <div className="information sm:mt-0 mt-3">
              <span className="font-poppins font-normal text-white sm:text-[23px] inline-block text-[18px] sm:w-[150px] w-[120px] text-right">
                Price
              </span>
              <span className="ml-2 font-poppins font-normal text-white sm:text-[23px] inline-block text-[18px] text-center border-l-2 px-2">
                ${productDetail.given_price}
              </span>
            </div>
            <div className="information">
              <span className="font-poppins font-normal text-white sm:text-[23px] inline-block text-[18px] sm:w-[150px] w-[120px] text-right">
                Discount
              </span>
              <span className="ml-2 font-poppins font-normal text-white sm:text-[23px] inline-block text-[18px] text-center border-l-2 px-2">
                {productDetail.discount_rate}%
              </span>
            </div>
            <div className="information">
              <span className="font-poppins font-normal text-white sm:text-[23px] inline-block text-[18px] sm:w-[150px] w-[120px] text-right">
                Color
              </span>
              <span className="ml-2 font-poppins font-normal text-white sm:text-[23px] inline-block text-[18px] text-center border-l-2 px-2">
                {productDetail.color || "No Options"}
              </span>
            </div>
            {/* Specifications */}

            <h2 className="mt-5 sm:text-start text-center font-poppins text-[20px] font-semibold">
              Specifications
            </h2>
            <div className="bg-gray-950">
              {productDetail.specifications.map((spec, index) => {
                const [key, value] = Object.entries(spec)[0]; // Extract key-value pair
                return <Specifications key={index} title={key} info={value} />;
              })}
            </div>
            <div className="font-poppins font-normal text-white sm:text-[20px] inline-block text-[15px] w-auto text-normal mt-5">
              Description: {productDetail.description}
            </div>
            {button && (
              <div className="flex sm:justify-start justify-center items-center gap-2 mt-4 font-poppins">
                <button
                  className="text-black sm:p-2 p-3 bg-white rounded-xl w-[150px] hover:opacity-80"
                  onClick={() => addItemToCart(id)}
                >
                  Add to Cart
                </button>
              </div>
            )}
            {deleteButton && (
              <div className="flex sm:justify-start justify-center items-center gap-2 mt-4 font-poppins">
                <button
                  className="text-black sm:p-2 p-3 bg-white rounded-xl w-[150px] hover:opacity-80"
                  onClick={() => {
                    deleteItem(id);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Product Detials z*/}
          {/* Specifications */}
        </section>
      )}
    </>
  );
};

export default ProductDetails;
