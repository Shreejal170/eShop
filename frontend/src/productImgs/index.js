import headphone from "./headphone.png";
import iPhone from "./Ip15.png";
import Mic from "./mic.png";
import Mouse from "./Mouse.png";
import Monitor from "./monitor.png";
import RTX from "./RTX.png";
import Speaker from "./Speaker.png";

//Images used here were for testing.
const productData = [
  {
    id: 1,
    product_name: "Headphone",
    img: headphone,
    actual_price: 99,
    given_price: 30,
    discount_rate: 30,
  },
  {
    id: 2,
    product_name: "Iphone 15 Pro Max",
    img: iPhone,
    actual_price: 2199,
    given_price: 2000,
    discount_rate: 10,
  },
  {
    id: 3,
    product_name: "Microphone",
    img: Mic,
    actual_price: 50,
    given_price: 25,
    discount_rate: 50,
  },
  {
    id: 4,
    product_name: "4k Gaming Monitor",
    img: Monitor,
    actual_price: 299,
    given_price: 210,
    discount_rate: 30,
  },
  {
    id: 5,
    product_name: "Mouse",
    img: Mouse,
    actual_price: 99,
    given_price: 30,
    discount_rate: 30,
  },
  {
    id: 6,
    product_name: "RTX",
    img: RTX,
    actual_price: 3999,
    given_price: 2599,
    discount_rate: 30,
  },
  {
    id: 7,
    product_name: "Speaker",
    img: Speaker,
    actual_price: 99,
    given_price: 99,
    discount_rate: 0,
  },
];

export { RTX, iPhone, productData };
