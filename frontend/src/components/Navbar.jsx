import { useState, useEffect } from "react";
import { navLinks, navLinksSm, dropDownOptions } from "../constants";
import { brandLogo, menu, close, cartIcon } from "../assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cart from "./Cart";
import ShopContext from "../context/ShopContext";
import { useContext } from "react";

const Navbar = ({ showAlert }) => {
  const context = useContext(ShopContext);
  const { logOut } = context;
  const location = useLocation();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  // eslint-disable-next-line no-restricted-globals
  // const navigate = useNavigate();
  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    if (location.pathname) {
      const id = location.pathname.replace("/user/", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setToggle(false);
      }
    }
  }, [location]);

  const removeLogin = async () => {
    const data = await logOut();
    window.location.href = "/";
  };

  const navigateToHome = () => {
    navigate("/user/home");
  };

  const handleClick = (event) => {
    console.log(event.target.href);
    if (event.target.href.includes("logout")) {
      console.log("Log out request detected");
      removeLogin();
    }
  };
  return (
    <>
      <Cart showAlert={showAlert} />
      {/* <div className="outline md:mt-2 mt-8 h-[40px]"></div> */}
      <nav className="w-full flex py-6 justify-between items-center">
        {/* <nav className="w-full flex py-6 justify-between items-center fixed top-0 right-0 left-0 sm:px-16 px-6 z-[999] bg-gray-950"> */}
        <img
          src={brandLogo}
          alt="#"
          className="  h-[40px] w-[30px] logo-scaleup cursor-pointer object-contain"
          onClick={navigateToHome}
        />
        <div className="">
          {/* hello */}
          <ul className="list-none sm:flex hidden sm:ml-[0px] justify-cemter items-center w-auto h-auto ">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${index == navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              >
                <Link to={`/user/${nav.id}`}>{nav.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <ul className="list-none sm:flex hidden justify-end  text-white w-auto h-auto">
            <li>
              <img
                src={toggle ? close : menu}
                className="h-[28px] w-[28px] object-contain hover:cursor-pointer"
                alt="/"
                onClick={() => setToggle((prev) => !prev)}
              />
              <div
                className={`${toggle ? "flex" : "hidden"} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-20`}
              >
                <ul className="list-none flex flex-col justify-center items-center flex-1">
                  {dropDownOptions.map((nav, index) => {
                    return (
                      <li
                        key={nav.id}
                        className={`font-poppins font-normal flex cursor-pointer text-[16px] text-white ${index == dropDownOptions.length - 1 ? "mb-0" : "mb-4"}`}
                      >
                        <Link to={`/user/${nav.id}`} onClick={handleClick}>
                          {nav.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
            <li>
              <img
                src={cartIcon}
                className="h-[28px] w-[28px] object-contain ml-4 hover:cursor-pointer"
                alt="cart-icon"
                onClick={() => {
                  context.setCart(true);
                }}
              />
            </li>
          </ul>
        </div>

        <div className="sm:hidden flex justify-end items-center">
          <img
            src={toggle ? close : menu}
            className="h-[28px] w-[28px] object-contain "
            alt="/"
            onClick={() => setToggle((prev) => !prev)}
          />
          <div
            className={`${toggle ? "flex" : "hidden"} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          >
            <ul className="list-none flex flex-col justify-end items-center flex-1">
              {navLinksSm.map((nav, index) => {
                return (
                  <li
                    key={nav.id}
                    className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${index == navLinksSm.length - 1 ? "mb-0" : "mb-4"}`}
                  >
                    <Link to={`/user/${nav.id}`} onClick={handleClick}>
                      {nav.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <img
            src={cartIcon}
            className="h-[28px] w-[28px] object-contain ml-4"
            alt="cart-icon"
            onClick={() => {
              context.setCart(true);
            }}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
