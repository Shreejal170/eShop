import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ShopContext from "../context/ShopContext";

const RequestBar = ({ id, product_name }) => {
  const navigate = useNavigate();
  const navigateToProduct = (id) => {
    navigate(`/user/productdetails/${id}`);
  };
  return (
    <div className="max-w-[450px] h-[50px] bg-black-gradient flex justify-between p-1 items-center outline outline-black rounded-md">
      <div className="font-poppins sm:text-[20px]">{product_name}</div>
      <button
        className="p-2 rounded-md bg-teal-300 text-black"
        onClick={() => navigateToProduct(id)}
      >
        Check Out
      </button>
    </div>
  );
};

const ReviewRequest = () => {
  const context = useContext(ShopContext);
  const { seeRequest, reviewRequest } = context;
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    if (!seeRequest) {
      reviewRequest();
    }
  }, []);

  useEffect(() => {
    if (seeRequest) {
      if (seeRequest.length != 0) {
        setHidden(false);
      } else {
        setHidden(true);
      }
    }
  }, [seeRequest]);

  return (
    <>
      {hidden ? (
        <></>
      ) : (
        <section
          id="review-request"
          className={`bg-primary p-3 text-white outline-gray-500 outline max-w-[450px] mt-5 rounded-md`}
        >
          <div className="text-[30px] mb-2">Your Accepted Request</div>
          {seeRequest.map((request) => {
            return (
              <RequestBar
                key={request.product_id}
                id={request.product_id}
                product_name={request.product_name}
              />
            );
          })}
        </section>
      )}
    </>
  );
};

export default ReviewRequest;
