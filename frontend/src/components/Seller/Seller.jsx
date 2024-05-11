import React, { useContext, useState, useEffect } from "react";
import { layout } from "../../styles";
import VendorDetails from "./VendorDetails";
import CardItems from "./CardItems";
import ProductDetails from "../ProductDetails";
import AddProduct from "./AddProduct";
import { Routes, Route, useNavigate } from "react-router-dom";
import RequestPage from "./RequestPage";
import ShopContext from "../../context/ShopContext";

const SellerDetails = () => {
  const navigate = useNavigate();
  const context = useContext(ShopContext);
  const { sellerDetails, setSellerDetails } = context;
  const [image, setImage] = useState(
    "https://cdn.vectorstock.com/i/1000v/49/90/loading-icon-on-black-vector-24544990.jpg"
  );
  const navigateToAddProduct = () => {
    navigate("/seller/addProduct");
  };
  const navigateToVisitRequests = () => {
    navigate("/seller/visitrequests");
  };
  const logOut = () => {
    localStorage.removeItem("token");
    setSellerDetails(null);
    navigate("/");
  };

  useEffect(() => {
    if (sellerDetails && sellerDetails.seller && sellerDetails.seller.image) {
      setImage(
        `${process.env.REACT_APP_SERVER}/api/image/${sellerDetails.seller.image}`
      );
    }
  }, [sellerDetails]);

  return (
    <>
      <section
        id="dashboard"
        className={`${layout.sectionSeller} justify-center items-center  p-6`}
      >
        <div className="w-[200px] h-[200px] rounded-full  outline outline-teal-200 text-white flex justify-center items-center">
          <img
            src={image}
            alt="Loading.."
            className="object-cover w-[95%] h-[95%] rounded-full"
          />
        </div>
        <div className=" xs:w-[500px] w-[100%] p-5 sm:ml-4 sm:mt-8 mt-4 ">
          <VendorDetails />
          <div className="flex justify-center items-center gap-2 mt-4 font-poppins ">
            <button
              className="text-black sm:p-2 p-3 bg-white rounded-xl w-[150px] hover:opacity-80"
              onClick={navigateToAddProduct}
            >
              Add Product
            </button>
            <button
              className="text-black sm:p-2 p-3 bg-white rounded-xl w-[150px] hover:opacity-80"
              onClick={navigateToVisitRequests}
            >
              Visit Requests
            </button>
          </div>
          <div className="flex justify-center items-center mt-2 font-poppins">
            <button
              className="text-black sm:p-2 p-3 bg-white rounded-xl w-[150px] hover:opacity-80"
              onClick={logOut}
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

const Seller = (props) => {
  return (
    // <RequestPage />
    <Routes>
      <Route
        path=""
        element={
          <>
            <SellerDetails /> <CardItems showAlert={props.showAlert} />
          </>
        }
      ></Route>
      <Route
        path="/addProduct/:id"
        element={
          <div className="">
            <SellerDetails />
            <AddProduct showAlert={props.showAlert} />
          </div>
        }
      ></Route>
      <Route
        path="/addProduct"
        element={
          <div className="">
            <SellerDetails />
            <AddProduct showAlert={props.showAlert} />
          </div>
        }
      ></Route>
      <Route
        path="/visitrequests"
        element={
          <div className="">
            <SellerDetails />
            <RequestPage />
          </div>
        }
      ></Route>
      <Route path="productdetails/:id" element={<ProductDetails />}></Route>
    </Routes>
  );
};

export default Seller;
