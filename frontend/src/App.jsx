import "./App.css";
import { useState } from "react";
import Hero from "./components/Hero";
import styles from "./styles";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Services from "./components/Services";
import Checkout from "./components/Checkout";
import Interface from "./components/Interface/Interface";
import Login from "./components/Interface/Login";
import Singup from "./components/Interface/Signup";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import About from "././components/About";
import ShopState from "./context/ShopState";
import Seller from "./components/Seller/Seller";
import ProductDetails from "./components/ProductDetails";
import CreateRequest from "./components/CreateRequest";
import Alert from "./components/Alert";
import Footer from "./components/Footer";

const UserRoutes = () => {
  const location = useLocation();
  const showHero = !location.pathname.includes("productdetails");
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => setAlert(null), 900);
  };

  return (
    <>
      <Alert alert={alert} />
      <div className="bg-primary w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar showAlert={showAlert} />
          </div>
        </div>
        {showHero && (
          <div className={`bg-primary ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
              <Hero />
            </div>
          </div>
        )}
        <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Routes>
              <Route
                path="home"
                element={<Products showAlert={showAlert} />}
              ></Route>
              <Route path="services" element={<Services />}></Route>
              <Route path="about" element={<About />}></Route>
              <Route
                path="productdetails/:id"
                element={<ProductDetails showAlert={showAlert} />}
              ></Route>
              <Route
                path="request"
                element={<CreateRequest showAlert={showAlert} />}
              ></Route>
            </Routes>
          </div>
        </div>
        <div className={`bg-transparent ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

const App = () => {
  const [sellerAlert, setSellerAlert] = useState(null);
  const showAlert = (message, type) => {
    setSellerAlert({
      message: message,
      type: type,
    });
    setTimeout(() => setSellerAlert(null), 3000);
  };
  return (
    <>
      <Alert alert={sellerAlert} />
      <ShopState>
        <Router>
          <Routes>
            <Route path="/" element={<Interface />}></Route>
            <Route
              path="/login/:id"
              element={<Login showAlert={showAlert} />}
            ></Route>
            <Route
              path="/signup/:id"
              element={<Singup showAlert={showAlert} />}
            ></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route
              path="/seller/*"
              element={<Seller showAlert={showAlert} />}
            />
            <Route path="/user/*" element={<UserRoutes />} />
          </Routes>
        </Router>
      </ShopState>
    </>
  );
};

// const App = () => {
//   return (
//     <ShopState>
//       <Checkout />
//     </ShopState>
//   );
// };

// const App = () => {
//   return (
//     <>
//       <ProductDetails />
//     </>
//   );
// };
export default App;
