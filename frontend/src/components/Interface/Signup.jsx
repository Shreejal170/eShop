import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import ShopContext from "../../context/ShopContext";

const Singup = ({ showAlert }) => {
  const formRef = useRef();
  const context = useContext(ShopContext);
  const location = useLocation();
  const [buttonMessage, setButtonMessage] = useState("Upload Image");
  const [seller, setSeller] = useState(false);
  const { signupUser, signupSeller } = context;
  const navigate = useNavigate();

  const [sellerRequest, setSellerRequest] = useState({
    name: "",
    email: "",
    store: "",
    password: "",
    image: "",
  });

  const [userRequest, setUserRequest] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState(null);

  const onSellerInputChange = (e) => {
    setSellerRequest({ ...sellerRequest, [e.target.name]: e.target.value });
  };

  const onUserInputChange = (e) => {
    setUserRequest({ ...userRequest, [e.target.name]: e.target.value });
  };
  const onImageChange = (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("image", file);
    setButtonMessage("Image Uploaded");
    setFormData(data); // Update formData state
  };

  const signupASeller = async (formData, request) => {
    if (request.password !== request.confirm_password) {
      showAlert("Passwords do not match!!", "error");
      return;
    }
    const data = await signupSeller(formData, request);
    if (!data) {
      showAlert("Please use the proper values", "error");
    }
    navigate("/seller");
  };

  const signupAUser = async (request) => {
    if (request.password !== request.confirm_password) {
      showAlert("Passwords do not match!!", "error");
      return;
    }
    const data = await signupUser(request);
    if (!data) {
      showAlert("Please use the proper values", "error");
    }
    navigate("/user/home");
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (formData) {
      if (seller) {
        signupASeller(formData, sellerRequest);
      }
    } else {
      signupAUser(userRequest);
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
  }, [location]);

  return (
    <>
      <section
        id="signup"
        className="w-full flex items-center justify-center bg-primary p-6 mb-5 min-h-[100vh]"
      >
        <div className="max-w-md w-full mx-auto p-6 bg-black rounded-lg shadow-md outline outline-white mt-2 mb-2 font-poppins">
          <h2 className="text-3xl text-center text-teal-200 font-bold mb-6">
            Create Account
          </h2>
          <form ref={formRef} onSubmit={submitForm}>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor=""
              >
                Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-white focus:outline-none bg-black focus:border-blue-500"
                required
                name="name"
                type="text"
                onChange={seller ? onSellerInputChange : onUserInputChange}
              />
            </div>
            {seller && (
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-semibold mb-2"
                  htmlFor=""
                >
                  Store Name
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg text-white focus:outline-none bg-black focus:border-blue-500"
                  required
                  name="store"
                  type="text"
                  onChange={seller ? onSellerInputChange : onUserInputChange}
                />
              </div>
            )}
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
                onChange={seller ? onSellerInputChange : onUserInputChange}
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
                onChange={seller ? onSellerInputChange : onUserInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor=""
              >
                Confirm Password
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-white focus:outline-none bg-black focus:border-blue-500"
                required
                name="confirm_password"
                type="password"
                onChange={seller ? onSellerInputChange : onUserInputChange}
              />
            </div>
            {seller && (
              <div className="mb-4">
                <label
                  htmlFor="input-file"
                  className="bg-white p-1 rounded-md mt-2 cursor-pointer hover:opacity-80"
                >
                  {buttonMessage}
                </label>
                <input
                  type="file"
                  name="file"
                  accept="image/jpeg, image/png, image/jpg"
                  id="input-file"
                  className="hidden"
                  onChange={onImageChange}
                />
              </div>
            )}
            <div className="flex justify-center mt-2">
              <button
                type="submit"
                className="bg-teal-200 text-black font-semibold px-4 py-3 rounded-lg hover:bg-teal-300 focus:outline-white"
              >
                Create an account
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Singup;
