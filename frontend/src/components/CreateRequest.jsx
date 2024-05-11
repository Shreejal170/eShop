import { useState, useRef } from "react";
import { useContext } from "react";
import ShopContext from "../context/ShopContext";
import TextareaAutosize from "react-textarea-autosize";
// import Alert from "./Alert";

const CreateRequest = (props) => {
  const formRef = useRef();
  const context = useContext(ShopContext);
  const { createRequest } = context;
  const [request, setRequest] = useState({
    product_name: "",
    category: "",
    description: "",
    price_range: "",
    image: "",
  });
  const [formData, setFormData] = useState(null);

  const onInputChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("image", file);
    setFormData(data); // Update formData state
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (formData) {
      // Check if formData is not null
      const response = await createRequest(formData, request);
      if (response === "Ok") {
        setFormData(null); // Reset formData
        setRequest({
          product_name: "",
          category: "",
          price_range: "",
          description: "",
          image: "",
        });
        formRef.current.reset();
        props.showAlert("Request Sent Successfully", "success");
      }
    }
  };
  // sm:outline outline-none ss:outline-white
  return (
    <section
      id="request"
      className="w-full flex items-center justify-center bg-primary p-6 mb-5"
    >
      <div className="max-w-md w-full mx-auto p-6 bg-black rounded-lg shadow-md outline outline-white mt-2 mb-2 font-poppins">
        <h2 className="text-3xl text-center text-teal-200 font-bold mb-6">
          Create Request
        </h2>
        <form ref={formRef} onSubmit={submitForm}>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor=""
            >
              Product Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg text-white focus:outline-none bg-black focus:border-blue-500"
              required
              name="product_name"
              type="text"
              onChange={onInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor=""
            >
              Category
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg text-white focus:outline-none bg-black focus:border-blue-500"
              required
              name="category"
              type="text"
              onChange={onInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor=""
            >
              Price Range
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg text-white focus:outline-none bg-black focus:border-blue-500"
              placeholder="$90-$100"
              required
              name="price_range"
              type="text"
              onChange={onInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor=""
            >
              Description
            </label>
            <TextareaAutosize
              className="w-full px-3 py-2 border rounded-lg text-white focus:outline-none bg-black focus:border-blue-500"
              required
              name="description"
              type="text"
              onChange={onInputChange}
              placeholder=" Height-2meter
                Length-2meter
                Width-2meter"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="input-file"
              className="bg-white p-1 rounded-md mt-2 cursor-pointer hover:opacity-80"
            >
              Upload Image
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
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              className="bg-teal-200 text-black font-semibold px-4 py-3 rounded-lg hover:bg-teal-300 focus:outline-white"
            >
              Notify Sellers
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateRequest;
