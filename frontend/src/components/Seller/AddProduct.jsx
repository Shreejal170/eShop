import { useState, useRef, useContext, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import ShopContext from "../../context/ShopContext";
import { useLocation, useParams } from "react-router";
// import ShopContext from "../context/ShopContext";
// import Alert from "./Alert";

const AddProduct = (props) => {
  const location = useLocation();
  const match = location.pathname.match(/^\/seller\/addProduct\/(.+)$/);
  // console.log(location.pathname);
  const context = useContext(ShopContext);
  const { postProduct, acceptRequest } = context;
  const { id } = useParams();
  const formRef = useRef();
  const [buttonColor, setButtonColor] = useState("bg-white");

  const [product, setProduct] = useState({
    product_name: "",
    actual_price: "",
    given_price: "",
    description: "",
    image: "",
    category: "",
    specifications: "",
  });

  const [formData, setFormData] = useState(null);
  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("image", file);
    setFormData(data); // Update formData state
    setButtonColor("bg-green-300");
  };
  const [product_id, setProduct_id] = useState(null);
  const submitForm = async (e) => {
    e.preventDefault();
    if (formData) {
      // Check if formData is not null
      const response = await postProduct(formData, product);
      if (response.message === "Ok") {
        // setFormData(null); // Reset formData
        console.log(product_id);
        setProduct_id(response.product_id);
        setProduct({
          product_name: "",
          actual_price: "",
          given_price: "",
          description: "",
          image: "",
          category: "",
          specifications: "",
        });
        formRef.current.reset();
        props.showAlert("Product Added Successfully", "success");
      } else {
        props.showAlert("Something went wrong", "error");
      }
      if (match) {
        const product_id = response.product_id;
        // console.log({ id, product_id });
        const match_response = await acceptRequest(id, product_id);
        if (match_response.success == true) {
          props.showAlert("Successfully Notified", "success");
        } else {
          props.showAlert(match_response.message, "error");
        }
      }
    }
  };

  return (
    <section id="addProduct" className=" text-white p-2">
      <div className="max-w-md w-full mx-auto p-6  rounded-lg shadow-md outline outline-white mt-2 mb-2 font-poppins">
        <h2 className="text-3xl text-center text-teal-200 font-bold mb-6">
          {match ? "Request Accepted" : "Add Product"}
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
              Specifications
            </label>
            <TextareaAutosize
              className="w-full px-3 py-2 border rounded-lg text-white focus:outline-none bg-black focus:border-blue-500"
              required
              name="specifications"
              type="text"
              onChange={onInputChange}
              placeholder=" RAM-4GB
                Storage-128GB SSD"
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
              placeholder=" Product's Description"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor=""
            >
              Listed Price
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg text-white focus:outline-none bg-black focus:border-blue-500"
              placeholder="100"
              required
              name="actual_price"
              type="text"
              onChange={onInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor=""
            >
              Discounted Price
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg text-white focus:outline-none bg-black focus:border-blue-500"
              placeholder="90"
              required
              name="given_price"
              type="text"
              onChange={onInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="input-file"
              className={`${buttonColor} p-1 rounded-md mt-2 cursor-pointer hover:opacity-80 text-black`}
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
              {match ? "Notify User" : "Post Your Product"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
