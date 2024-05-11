import { useState, useEffect } from "react";
import ShopContext from "./ShopContext";
import axios from "axios";

const ShopState = (props) => {
  const server = process.env.REACT_APP_SERVER;
  const [cart, setCart] = useState(false);
  const [products, setProducts] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [requests, setRequests] = useState(null);
  const [seeRequest, setSeeRequest] = useState(null);
  const [sellerProducts, setSellerProducts] = useState(null);
  const [cartItems, setCartItems] = useState(null);
  const [sellerDetails, setSellerDetails] = useState(null);

  const checkToken = () => {
    const type = typeof localStorage.getItem("token");
    if (
      localStorage.getItem("token") == "undefined" ||
      !localStorage.getItem("token") ||
      type == "object"
    ) {
      window.location.href = "/";
    }
  };

  const fetchProducts = async () => {
    checkToken();
    const response = await fetch(`${server}/api/shop/fetchproducts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setProducts(data);
  };

  const getProductDetail = async (id) => {
    checkToken();
    const response = await fetch(`${server}/api/shop/getdetails/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(`This is the respones data`, data);
    setProductDetail(data);
  };

  function convertData(data) {
    const items = data.split("\n");
    const result = items.map((item) => {
      const [key, value] = item.split("-");
      return { [key]: value };
    });

    return result;
  }

  const postImage = async (formData) => {
    const imageResponse = await axios.post(
      `${server}/api/request/save-image`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    const jsonData = await imageResponse.data;
    return jsonData;
  };

  const signupSeller = async (formData, request) => {
    const { name, email, password, store, image } = request;
    const jsonData = await postImage(formData);
    request.image = jsonData.filename;
    const response = await fetch(`${server}/api/auth/createseller`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        store: store,
        image: request.image,
      }),
    });

    const data = await response.json();
    if (data.success == true) {
      localStorage.setItem("token", data.authToken);
      return true;
    } else {
      return false;
    }
  };

  const signupUser = async (request) => {
    const response = await fetch(`${server}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: request.name,
        email: request.email,
        password: request.password,
      }),
    });
    const data = await response.json();
    if (data.success == true) {
      localStorage.setItem("token", data.authToken);
      return true;
    } else {
      return false;
    }
  };

  const loginUser = async (request) => {
    const response = await fetch(`${server}/api/auth/loginuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: request.email,
        password: request.password,
      }),
    });
    const data = await response.json();
    if (data.success == true) {
      localStorage.removeItem("token");
      localStorage.setItem("token", data.token);
      return true;
    } else {
      return false;
    }
  };

  const loginSeller = async (request) => {
    const response = await fetch(`${server}/api/auth/loginseller`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: request.email,
        password: request.password,
      }),
    });
    const data = await response.json();
    if (data.success == true) {
      localStorage.removeItem("token");
      localStorage.setItem("token", data.token);
      return true;
    } else {
      return false;
    }
  };

  const postProduct = async (formData, product) => {
    checkToken();
    const jsonData = await postImage(formData);
    product.image = jsonData.filename;
    const {
      product_name,
      actual_price,
      given_price,
      description,
      image,
      category,
    } = product;
    const specifications = convertData(product.specifications);

    const response = await fetch(`${server}/api/shop/addproduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: product_name,
        actual_price,
        given_price,
        description,
        image,
        category,
        specifications,
      }),
    });
    const res_data = await response.json();
    return res_data.message == "Product Added Successfully"
      ? { message: "Ok", product_id: res_data._id }
      : { message: "Bad Request" };
  };

  const deleteProduct = async (id) => {
    checkToken();
    const response = await fetch(`${server}/api/shop/deleteproduct/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const res_data = await response.json();
    const newSellerProducts = sellerProducts.filter((product) => {
      return product._id !== id;
    });
    setSellerProducts(newSellerProducts);
    return res_data;
  };

  const fetchSellerProducts = async () => {
    checkToken();
    const response = await fetch(`${server}/api/shop/getsellerproducts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setSellerProducts(data);
  };

  const createRequest = async (formData, request) => {
    checkToken();
    const { product_name, category, price_range, description, image } = request;
    const jsonData = await postImage(formData);
    console.log(request);
    request.image = jsonData.filename;
    const response = await fetch(`${server}/api/request/createrequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        product_name,
        category,
        price_range,
        description,
        image: request.image,
      }),
    });
    const res_data = await response.json();
    return res_data.message == "Request created successfully"
      ? "Ok"
      : "Bad Request";
  };

  const fetchRequests = async () => {
    checkToken();
    const response = await fetch(`${server}/api/request/fetchallrequests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setRequests(data);
  };

  const acceptRequest = async (id, product_id) => {
    checkToken();
    const response = await fetch(`${server}/api/request/acceptrequest/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id,
      }),
    });
    const data = await response.json();
    return data;
  };

  const getSellerDetails = async () => {
    checkToken();
    const response = await fetch(`${server}/api/auth/getsellerdetails`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setSellerDetails(data);
  };

  const reviewRequest = async () => {
    const response = await fetch(`${server}/api/request/reviewrequest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setSeeRequest(data);
  };

  const placeOrder = async (id) => {
    checkToken();
    const response = await fetch(`${server}/api/order/placeorder/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        quantity: 1,
      }),
    });
    const newOrder = await response.json();
    setCartItems(cartItems.concat(newOrder));
    return newOrder;
  };

  const fetchOrders = async () => {
    checkToken();
    const response = await fetch(`${server}/api/order/fetchorders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setCartItems(data);
    return data;
  };

  const editOrder = async (id, quantity) => {
    checkToken();
    const response = await fetch(`${server}/api/order/editorder/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        quantity,
      }),
    });
    const data = await response.json();
    setCartItems(
      cartItems.map((item) => {
        return item._id === data.edited_order._id ? data.edited_order : item;
      })
    );
    return data;
  };

  const removeOrder = async (id) => {
    checkToken();
    const response = await fetch(`${server}/api/order/removeorder/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    try {
      setCartItems(
        cartItems.filter((item) => item._id !== data.deletedOrder._id)
      );
    } catch {
      const dataRenew = await fetchOrders();
      setCartItems(dataRenew);
    }
    return data;
  };

  const checkOutOrders = async () => {
    checkToken();
    const response = await fetch(`${server}/api/order/checkoutorders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    return data;
  };

  const logOut = async () => {
    localStorage.removeItem("token");
    return true;
  };

  return (
    <ShopContext.Provider
      value={{
        signupUser,
        signupSeller,
        loginSeller,
        loginUser,
        cart,
        setCart,
        createRequest,
        acceptRequest,
        postProduct,
        deleteProduct,
        fetchProducts,
        fetchSellerProducts,
        getSellerDetails,
        setSellerDetails,
        sellerDetails,
        sellerProducts,
        requests,
        fetchRequests,
        seeRequest,
        reviewRequest,
        products,
        productDetail,
        getProductDetail,
        placeOrder,
        editOrder,
        removeOrder,
        checkOutOrders,
        fetchOrders,
        cartItems,
        setCartItems,
        logOut,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopState;
