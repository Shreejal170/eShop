import styles, { layout } from "../styles";
import { dVan, dScooter, van } from "../assets";
import CardDeal from "./CardDeal";
import Stats from "./Stats";

const Services = () => (
  <>
    <section id="services" className={`${layout.sectionReverse}`}>
      <div className={`${layout.sectionImgReverse}`}>
        <img
          src={van}
          alt="services"
          className="md:h-[100%] md:w-[100%] sm:w-[80%] w-[100%] relative z-[5] object-contain"
          style={{ transform: "scale(0.)" }}
        />
        <div
          className={`absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full text-white white__gradient`}
        />
        <div
          className={`absolute z-[0] -left-1/2 bottom-0 w-[50%] h-[50%] rounded-full text-white pink__gradient`}
        />
      </div>
      <div className={`${layout.sectionInfo}`}>
        <h2 className={`${styles.heading2}`}>
          We ensure the <br className="sm:block hidden" />
          safest delivery.
        </h2>
        <p className={`${styles.paragraph} font-poppins max-w-[470px] mt-5`}>
          At eShop, we prioritize not just speed, but also the safety and
          integrity of your purchases. Our delivery system is designed to handle
          your items with utmost care, ensuring they reach you in perfect
          condition. We understand the value of every purchase you make, and
          we're committed to providing a delivery service that respects that
          value. From our warehouse to your doorstep, we guarantee a shopping
          experience that is seamless, reliable, and secure.
        </p>
        <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
          <img
            src={dVan}
            alt="apple"
            style={{ transform: "rotateY(180deg)" }}
            className="h-[42px] w-[128px] object-contain mr-5 cursor-pointer"
          />
          <img
            src={dScooter}
            alt="google"
            style={{ transform: "rotateY(180deg)" }}
            className="h-[42px] w-[128px] object-contain mr-5 cursor-pointer"
          />
        </div>
      </div>
    </section>
    <CardDeal />
  </>
);

export default Services;
