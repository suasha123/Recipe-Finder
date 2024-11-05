import styles from "./Navbar.module.css";
import { IoMdClose } from "react-icons/io";
import logo from "./assets/image copy 3.png";
import { useState } from "react";

export const Sidebar = ({ closeSidebar }) => {
  const arr = ["Home", "About us", "Services", "Contact", "Get a quote"];
  const [isClosing, setIsClosing] = useState(false); // State to manage closing animation

  const handleCloseClick = () => {
    setIsClosing(true); // Start closing animation
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      closeSidebar(); // Call the function to close the sidebar completely
      setIsClosing(false); // Reset the closing state
    }
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${
          isClosing ? styles.fadeOut : styles.fadeIn
        }`}
        onClick={handleCloseClick}
      ></div>
      <div
        className={`${styles.sidebar} ${
          isClosing ? styles.close : styles.open
        }`}
        onAnimationEnd={handleAnimationEnd} // Listen for animation end
      >
        <div className={styles.head}>
          <img src={logo} alt="Logo" />
          <span className={styles.toggle} onClick={handleCloseClick}>
            <IoMdClose className={styles.tt} />
          </span>
        </div>
        <ul>
          {arr.map((ele, index) => (
            <li key={index} className={styles.sidebarItem}>
              <a href="#" className={styles.sidebarLink}>
                {ele}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
