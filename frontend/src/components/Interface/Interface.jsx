import React from "react";
import { useNavigate } from "react-router";

const Interface = () => {
  const navigate = useNavigate();
  const handleClick = (event) => {
    const pathName = event.target.name;
    navigate(`/${pathName}`);
  };
  return (
    <>
      <section
        id="interface"
        className="flex w-full min-h-[100vh] justify-center items-center p-4"
      >
        <div className="bg-primary p-3 text-white outline-gray-500 outline max-w-[450px] mt-5 rounded-md w-full">
          <div className="text-[30px] mb-2 md:min-w-[400px] text-center font-poppins">
            Welcome to eShop!
          </div>
          <div className="max-w-[450px] h-[50px] bg-black-gradient mt-3 flex justify-between p-1 items-center outline outline-black rounded-md">
            <div className="font-poppins sm:text-[20px] p-3">
              Singup as a User
            </div>
            <button
              name="signup/user"
              className="p-2 rounded-md font-poppins bg-teal-300 hover:bg-teal-500 text-black min-w-[100px]"
              onClick={handleClick}
            >
              Click Here!
            </button>
          </div>
          <div className="max-w-[450px] h-[50px] bg-black-gradient flex justify-between p-1 items-center outline outline-black rounded-md mt-2">
            <div className="font-poppins sm:text-[20px] p-3">
              Singup as a Seller
            </div>
            <button
              name="signup/seller"
              className="p-2 rounded-md font-poppins bg-teal-300 hover:bg-teal-500 text-black min-w-[100px]"
              onClick={handleClick}
            >
              Click Here!
            </button>
          </div>
          <div className="max-w-[450px] h-[50px] bg-black-gradient flex justify-between p-1 items-center outline outline-black rounded-md mt-2">
            <div className="font-poppins sm:text-[20px] p-3 ">
              Login as a User
            </div>
            <button
              name="login/user"
              className="p-2 rounded-md font-poppins bg-teal-300 hover:bg-teal-500 text-black min-w-[100px]"
              onClick={handleClick}
            >
              Click Here!
            </button>
          </div>
          <div className="max-w-[450px] h-[50px] bg-black-gradient flex justify-between p-1 items-center outline outline-black rounded-md mt-2">
            <div className="font-poppins sm:text-[20px] p-3">
              Login as a Seller
            </div>
            <button
              name="login/seller"
              className="p-2 rounded-md font-poppins bg-teal-300 hover:bg-teal-500 text-black min-w-[100px]"
              onClick={handleClick}
            >
              Click Here!
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Interface;
