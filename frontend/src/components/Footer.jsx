import React from "react";
import styles from "../styles";
import { footerLinks, socialMedia } from "../constants";
import { shopLogo } from "../assets";
const Footer = () => {
  return (
    <section className={`${styles.flexCenter} p-6 flex-col `}>
      <div className="mb-8 w-full border-t-2 border-t-[#3f3e45] border-dashed">
        <div className="mt-5">
          <div
            className={`${styles.flexStart} md:flex-row flex-col justify-center items-center`}
          >
            <div className="flex-1 flex flex-col justify-start ">
              <div className="flex md:flex-row flex-col items-center">
                <img
                  src={shopLogo}
                  alt="hoobank logo"
                  className="md:w-[72px] md:h-[72px] w-[150px] h-[150px] object-contain"
                />
                <p className="text-teal-50 font-poppins text-[25px] md:text-center text-start md:ml-2 ml-0">
                  eShop!!
                </p>
              </div>
              <p
                className={`${styles.paragraph} md:w-[310px] w-full mt-4 md:text-start text-center `}
              >
                Experience a fresh approach to online shopping with eShop, where
                convenience meets variety.
              </p>
            </div>
            <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10 mb-4">
              {footerLinks.map((footerLink) => {
                return (
                  <div
                    key={footerLink.key}
                    className="flex flex-col ss:my-0 my-4 min-w-[150px]"
                  >
                    <h4
                      className={`font-poppins font-medium text-[18px] text-white leading-[27px]`}
                    >
                      {footerLink.title}
                    </h4>
                    <ul className="mt-4 list-none">
                      {footerLink.links.map((link, index) => (
                        <li
                          key={link.name}
                          className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${index !== footerLink.links.length - 1 ? "mb-4" : "mb-0"}`}
                        >
                          {link.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3f3e45]">
            <p
              className={`font-poppins font-normal text-center text-[18px] text-white leading-[27px]`}
            >
              © 2024 eShop. All rights reserved.
            </p>
            <div className="flex flex-row md:mt-0 mt-6">
              {socialMedia.map((social, index) => (
                <img
                  key={social.id}
                  src={social.icon}
                  alt={social.id}
                  className={`w-[24px] h-[21px] object-contain cursor-pointer ${index !== socialMedia.length - 1 ? "mr-6" : "mr-0"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
