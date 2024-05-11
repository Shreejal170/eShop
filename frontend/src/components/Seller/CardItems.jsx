import React, { useContext, useEffect, useState } from "react";
import { iPhone } from "../../productImgs";
import ShopContext from "../../context/ShopContext";
import { useNavigate } from "react-router";

const Cards = ({ deleteProduct, id, name, ap, sp, disc, img, showAlert }) => {
  const navigate = useNavigate();
  const navigateToProduct = (id) => {
    navigate(`/seller/productdetails/${id}`);
  };

  const deleteItem = async (id) => {
    const response = await deleteProduct(id);
    if (response.error) {
      showAlert(response.error, "error");
    }
    if (response.success == true) {
      showAlert("Product has been deleted successfully", "success");
    }
  };

  return (
    <div className="w-[325px] h-[450px] bg-black-gradient mt-4 flex flex-col justify-center items-center gap-6 card rounded-md">
      <div className="w-[268px] h-[158px] ">
        <img
          src={`${process.env.REACT_APP_SERVER}/api/image/${img}`}
          alt={name}
          className="w-[100%] h-[100%] object-contain"
        />
      </div>
      <div className="h-[1px] w-[80%] border-t-2 border-white "></div>
      <div id="title-card">
        <h2 className="text-[24px] font-poppins font-bold -tracking-tight ">
          {name}
        </h2>
      </div>
      <div id="info" className="text-center text-info font-poppins ">
        Actual Price: ${ap}
        <br />
        Selling for: $${sp}
        <br />
        Discount:{disc}%
        <br />
      </div>
      <div id="card-buttons" className="flex gap-2 mt-2">
        <button
          className="card-button font-poppins rounded-[9px] text-[15px] "
          onClick={() => navigateToProduct(id)}
        >
          See Details
        </button>
        <button
          className="card-button font-poppins rounded-[9px] text-[15px]"
          onClick={() => {
            deleteItem(id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const CardItems = (props) => {
  const context = useContext(ShopContext);
  const { sellerProducts, fetchSellerProducts, deleteProduct } = context;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!sellerProducts) {
      fetchSellerProducts();
    }
  }, []);

  useEffect(() => {
    if (sellerProducts) {
      if (sellerProducts.length > 0) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    }
  }, [sellerProducts]);

  return (
    <>
      {loading ? (
        <>
          <div className="text-center font-poppins text-white sm:text-[20px]">
            Add Products to get started
          </div>
        </>
      ) : (
        <>
          <div className="text-white text-center text-[25px]  font-poppins">
            Your Products
          </div>
          <div
            id="cards"
            className="p-3 text-white grid am:grid-cols-2  lg:grid-cols-3 sl:grid-cols-4 grid-cols-1 gap-2 place-items-center bg-primary "
          >
            {sellerProducts.map((product) => {
              return (
                <Cards
                  showAlert={props.showAlert}
                  deleteProduct={deleteProduct}
                  key={product._id}
                  id={product._id}
                  name={product.product_name}
                  ap={product.actual_price}
                  sp={product.given_price}
                  disc={product.discount_rate}
                  img={product.image}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default CardItems;
