import React, { useContext, useState, useEffect } from "react";
import ShopContext from "../../context/ShopContext";

const VendorDetails = () => {
  const context = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [publishedItems, setPublishedItems] = useState(0);
  const { sellerDetails, getSellerDetails, sellerProducts } = context;

  useEffect(() => {
    if (!sellerDetails) {
      getSellerDetails();
      // console.log("func calling");
    }
  }, []);

  useEffect(() => {
    if (sellerDetails) {
      setLoading(false);
    }
  }, [sellerDetails]);

  useEffect(() => {
    if (sellerProducts) {
      setPublishedItems(sellerProducts.length);
    }
  }, [sellerProducts]);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <>
          <div className="flex flex-row">
            <div className="w-[110px]  text-white border sm:text-[20px] text-[16px] px-2 font-poppins text-center">
              Name
            </div>
            <div className="flex-1  text-teal-200 border sm:text-[20px] text-[16px] px-4">
              {sellerDetails.seller.name}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-[110px] text-white border sm:text-[20px] text-[16px] px-2 text-center">
              Store
            </div>
            <div className="flex-1  text-teal-200 border sm:text-[20px] text-[16px] px-4">
              {sellerDetails.seller.store}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-[110px]  text-white border sm:text-[20px] text-[16px] px-2 sm:leading-7 leading-5 text-center">
              Published Items
            </div>
            <div className="flex-1  text-teal-200 border sm:text-[20px] text-[16px] px-4">
              {publishedItems}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-[110px]  text-white border sm:text-[20px] text-[16px] px-2 text-center">
              Sold Units
            </div>
            <div className="flex-1  text-teal-200 border sm:text-[20px] text-[16px] px-4">
              {publishedItems}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VendorDetails;
