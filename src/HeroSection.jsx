import styles from "./Hero.module.css";
import { useRef } from "react";
export const Hero = ({ onClick }) => {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.para}>WELCOME TO TASTE QUEST</p>
        <h1>
          Fuel{" "}
          <span style={{ color: "#ffa300", background: "transparent" }}>
            your
          </span>{" "}
          <span style={{ color: "#ffa300", background: "transparent" }}>
            {" "}
            body{" "}
          </span>
          right
        </h1>
        <p className={styles.description}>
          Not only does TasteQuest make it easy to find recipes for every
          dietary preference, but we also highlight recipes with high-protein,
          low-carb, or heart-healthy ingredients. Filter recipes based on what
          matters to you, and enjoy a healthier way to cook.
        </p>
        <button
          onClick={onClick}
          style={{
            marginTop: "25px",
            cursor: "pointer",
            border: "none",
            outline: "none",
            color: "white",
            fontSize: "17px",
            backgroundColor: "#69a71f",
            width: "150px",
            height: "50px",
            fontFamily: "sora",
          }}
        >
          Get Started
        </button>
      </div>
      <div className={styles.content3}></div>
    </div>
  );
};
