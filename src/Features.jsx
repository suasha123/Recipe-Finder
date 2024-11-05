import styles from "./Features.module.css";
import logo from "./assets/recipe.jpg";
import vegan from "./assets/vegan.jpg";
import ad from "./assets/ad.jpg";
import online from "./assets/online.png";
import img from "./assets/image copy 5.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const Feature = () => {
  return (
    <section className={styles.featuressection}>
      <h2>Key Features</h2>
      <div className={styles.featurescontainer}>
        <div className={styles.featurecard}>
          <div className={styles.containerimg}>
            <img src={logo} />
          </div>
          <h3>Personalized Recipe Generation</h3>
          <p>
            Generate recipes based on the ingredients you have, tailored to your
            preferences.
          </p>
          <Link to="/generate-recipes" className={styles.a}>
            {" "}
            Try Now <FaArrowRightLong className={styles.arrow} />{" "}
          </Link>
          {/*<a href='#'> Try Now <FaArrowRightLong className={styles.arrow}/></a>*/}
        </div>
        <div className={styles.featurecard}>
          <div className={styles.containerimg}>
            <img src={vegan} />
          </div>
          <h3>Dietary Restriction Options</h3>
          <p>
            Filter recipes based on dietary needs like vegan, gluten-free, and
            more.
          </p>
          <Link to="/generate-recipes" className={styles.a}>
            {" "}
            Try Now <FaArrowRightLong className={styles.arrow} />
          </Link>
        </div>
        <div className={styles.featurecard}>
          <div className={styles.containerimg}>
            <img src={ad} />
          </div>
          <h3>Skill Level Adjustments</h3>
          <p>
            Choose recipes that match your cooking skills, from beginner to
            expert.
          </p>
          <Link to="/generate-recipes" className={styles.a}>
            {" "}
            Try Now <FaArrowRightLong className={styles.arrow} />
          </Link>
        </div>
        <div className={styles.featurecard}>
          <div className={styles.containerimg}>
            <img src={online} />
          </div>
          <h3>Search Functionality</h3>
          <p>Easily find recipes with our intuitive search bar.</p>
          <Link to="/search" className={styles.a}>
            {" "}
            Try Now <FaArrowRightLong className={styles.arrow} />
          </Link>
        </div>
        <div className={styles.featurecard}>
          <div className={styles.containerimg}>
            <img src={img} className={styles.imagelast} />
          </div>
          <h3>Responsive Design</h3>
          <p>
            Enjoy a seamless experience on any device, from desktop to mobile.
          </p>
          <Link className={styles.a}>
            Enjoy
            <FaArrowRightLong className={styles.arrow} />
          </Link>
        </div>
      </div>
    </section>
  );
};
