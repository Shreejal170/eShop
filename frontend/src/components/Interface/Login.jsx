import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import ShopContext from "../../context/ShopContext";

const Login = ({ showAlert }) => {
  const formRef = useRef();
  const context = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { loginUser, loginSeller } = context;
  const [seller, setSeller] = useState(false);
  const [request, setRequest] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (seller) {
      const success = await loginSeller(request);
      if (success) {
        navigate("/seller");
      } else {
        showAlert("Credentials do not match", "error");
      }
    } else {
      const success = await loginUser(request);
      if (success) {
        navigate("/user/home");
      } else {
        showAlert("Credentials do not match", "error");
      }
    }
  };

  useEffect(() => {
    if (location.pathname.includes("seller")) {
      setSeller(true);
    } else if (location.pathname.includes("user")) {
      setSeller(false);
    } else {
      setSeller(null);
    }
    console.log(seller);
  }, [location]);
  return (
    <>
      <section
        id="request"
        className="w-full min-h-[100vh] flex items-center justify-center bg-primary p-6 mb-5"
      >
        <div className="max-w-md w-full mx-auto p-6 bg-black rounded-lg shadow-md outline outline-white mt-2 mb-2 font-poppins">
          <h2 className="text-3xl text-center text-teal-200 font-bold mb-6">
            Login
          </h2>
          <form ref={formRef} onSubmit={submitForm}>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor=""
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-white focus:outline-none bg-black focus:border-blue-500"
                required
                name="email"
                type="email"
                onChange={onInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor=""
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-white focus:outline-none bg-black focus:border-blue-500"
                required
                name="password"
                type="password"
                onChange={onInputChange}
              />
            </div>
            <div className="flex justify-center mt-2">
              <button
                type="submit"
                className="bg-teal-300 text-black font-semibold px-4 py-3 rounded-lg hover:bg-teal-200 focus:outline-white min-w-[150px]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
