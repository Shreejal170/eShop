import React from "react";
import { shopLogo, discount } from "../assets";
import styles from "../styles";
import GetStarted from "./GetStarted";
import { useContext } from "react";
import ShopContext from "../context/ShopContext";

const Hero = () => {
  const context = useContext(ShopContext);
  return (
    <section
      id="user"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 `}
      >
        <div
          className={`flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2`}
        >
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span>Upto {""}</span>
            <span className="text-white">80%</span> Discount for{" "}
            <span className="text-white">New</span> Users
          </p>
        </div>
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins ss:text-[72px] font-semibold text-[52px] text-white ss:leading-[100px] leading-75px">
            Your
            <br className="sm:block hidden" />{" "}
            <span className="text-gradient">Ultimate</span>
          </h1>
          <div className={`ss:flex hidden md:mr-15 lg:mr-20 mr-0`}>
            <GetStarted />
          </div>
        </div>
        <h1 className="font-poppins ss:text-[68px] font-semibold text-[40px] text-dimWhite ss:leading-[100px] leading-75px w-full">
          Shopping Hub
        </h1>
      </div>
      <div
        className={`flex-1 flex ${styles.flexCenter} relative md:my-0 my-10 `}
      >
        <div className="element relative flex justify-center items-center animation-bounce w-[500px] h-[430px] ">
          <img
            src={shopLogo}
            alt="#"
            className="z-[1] object-contain w-[100%] h-[100%]"
          />
          <div className="absolute z-[0] w-[60%] h-[70%] bottom-10 warm__gradient "></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
