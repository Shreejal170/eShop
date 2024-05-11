import { card } from "../assets";
import styles, { layout } from "../styles";
import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Felxibillity in <br className="sm:block hidden" /> your purchases.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        eShop offers a shopping experience tailored to your needs. Browse,
        search, or explore recommendations at your pace. With a variety of
        products, secure payments, and real-time order tracking, eShop makes
        online shopping seamless and enjoyable.
      </p>
      <Button styles={`mt-10`} text="Get Started" />
    </div>
    <div className={`${layout.sectionImg}`}>
      <img src={card} alt="card" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;
