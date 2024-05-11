import React, { useState, useContext, useEffect } from "react";
import ShopContext from "../../context/ShopContext";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router";

const Cards = (props) => {
  const { id, category, image, price_range, product_name, description } = props;
  const navigate = useNavigate();
  const navigateToAddProduct = (id) => {
    navigate(`/seller/addProduct/${id}`);
  };
  return (
    <div className="relative group">
      {description && (
        <div
          className="absolute -top-10 bg-slate-900 w-full rounded-md opacity-0 group-hover:opacity-100 z-10 p-4"
          style={{ boxShadow: "0 0px 50px 2px rgba(96, 165, 250, 0.5)" }}
        >
          <h2 className="font-poppins text-center font-semibold">
            Description
          </h2>
          <p className="text-dimWhite font-poppins text-[15px] max-h-[350px] overflow-y-scroll no-scrollbar">
            {description}
          </p>
        </div>
      )}
      <div className="w-[325px] h-[450px] bg-black-gradient mt-4 flex flex-col justify-center items-center gap-6 card rounded-md z-0">
        <div className="w-[268px] h-[158px]">
          <img
            src={`${process.env.REACT_APP_SERVER}/api/image/${image}`}
            alt=""
            className="w-[100%] h-[100%] object-contain"
          />
        </div>
        <div className="h-[1px] w-[80%] border-t-2 border-white"></div>
        <div id="title-card">
          <h2 className="text-[24px] font-poppins font-bold -tracking-tight text-white">
            {product_name}
          </h2>
        </div>
        <div id="info" className="text-center text-info font-poppins">
          Price Range: {price_range}
          <br />
          Category: {category}
          <br />
        </div>
        <div id="card-buttons" className="flex gap-2">
          <button
            className="card-button font-poppins rounded-[9px] text-[15px]"
            onClick={() => navigateToAddProduct(id)}
          >
            I have!
          </button>
        </div>
      </div>
    </div>
  );
};

const RequestPage = () => {
  const context = useContext(ShopContext);
  const { requests, fetchRequests } = context;
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    if (!requests) {
      fetchRequests();
    }
  }, []);

  useEffect(() => {
    if (requests) {
      setLoading(false);
      if (selectedCategory === "All Items") {
        setFilteredRequests(requests);
      } else {
        setFilteredRequests(
          requests.filter((request) => request.category === selectedCategory)
        );
      }
    }
  }, [requests, selectedCategory]);

  return (
    <>
      {loading ? (
        <div className="p-3 text-white mt-3">Loading...</div>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center">
            <h2
              className={`text-pretty text-neon font-poppins text-center mt-10 md:w-[100%] w-auto block md:h-auto h-[90px]`}
            >
              <Typewriter
                options={{
                  strings: ["Welcome!!", "Check out demands!!"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h2>
          </div>
          <div className="flex justify-between items-center md:p-9 p-4 ">
            <span className="text-sm text-teal-100 md:text-[20px] bg-black-gradient p-3 rounded-md">
              Selected: <span className="text-white">{selectedCategory}</span>
            </span>
            <div className="flex">
              <select
                id="category"
                name="category"
                className="mt-1 block w-full max-w-[200px] py-2 px-3 border border-gray-600 bg-white text-black font-poppins rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All Items</option>
                {[...new Set(requests.map((request) => request.category))].map(
                  (category) => (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div
            id="cards"
            className="p-3 bg-primary text-white mt-3 grid am:grid-cols-2 lg:grid-cols-3 sl:grid-cols-4 grid-cols-1 gap-2 place-items-center"
          >
            {filteredRequests.map((request) => {
              return (
                <Cards
                  key={request._id}
                  id={request._id}
                  category={request.category}
                  image={request.image}
                  description={request.description || null}
                  price_range={request.price_range}
                  product_name={request.product_name}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default RequestPage;
