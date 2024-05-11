import React from "react";
import styles, { layout } from "../styles";
import { dVan, dScooter, mission } from "../assets";

const Mission = () => (
  <section className={`${layout.sectionReverse}`}>
    <div
      className={`${layout.sectionImgReverse}  justify-center items-center md:origin-top-left `}
    >
      <img
        src={mission}
        alt="mission"
        className="md:h-[90%] md:w-[90%] sm:w-[80%] w-[100%] relative z-[5] object-contain"
      />
      <div
        className={`absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full text-white white__gradient`}
      />
      <div
        className={`absolute z-[0] -left-1/2 bottom-0 w-[50%] h-[50%] rounded-full text-white pink__gradient`}
      />
    </div>
    <div className={`${layout.sectionInfo}`}>
      <h2 className={`${styles.heading2}`}>Our Mission.</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        eShop is committed to revolutionizing the online shopping experience.
        Our mission is to provide a comprehensive, user-friendly platform that
        caters to all your shopping needs, ensuring you never feel short of
        options. We strive to make every shopping journey seamless and
        satisfying.
      </p>
    </div>
  </section>
);

export default Mission;
