import React, { useContext, useEffect, useState } from "react";
// import { productData } from "../productImgs";
// import styles from '../styles'
import Cards from "./Cards";
import ShopContext from "../context/ShopContext";
import Typewriter from "typewriter-effect";
import ReviewRequest from "./ReviewRequest";

const Products = ({ showAlert }) => {
  const context = useContext(ShopContext);
  const { products, fetchProducts } = context;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Set loading state to true before fetching products
    fetchProducts()
      .then(() => {
        setLoading(false); // Set loading state to false after products are fetched
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false); // Set loading state to false in case of error
      });
    // eslint-disable-next-line
  }, []);

  return (
    <section
      id="home"
      className="border-t-2 border-x-gray-500 border-dashed mt-6"
    >
      <ReviewRequest />
      <div className="flex flex-col justify-center items-center">
        <h2
          className={`text-pretty text-neon font-poppins text-center mt-10 md:w-[100%] w-auto block md:h-auto h-[90px]`}
        >
          <Typewriter
            options={{
              strings: ["Order Now!!", "Get Yours Today!!"],
              autoStart: true,
              loop: true,
            }}
          />
        </h2>
      </div>
      {loading ? (
        <div className="p-3 text-white mt-3">Loading...</div>
      ) : (
        <div
          id="cards"
          className="px-3 py-5 text-white mt-3 grid am:grid-cols-2 lg:grid-cols-3 sl:grid-cols-4 grid-cols-1 gap-2 place-items-center"
        >
          {products.map((product) => {
            return (
              <Cards
                key={product._id}
                id={product._id}
                {...product}
                showAlert={showAlert}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Products;
