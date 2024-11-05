import { useState, useEffect } from "react";
import logo from "./assets/image copy 3.png";
import styles from "./Navbar.module.css";
import { FaBars } from "react-icons/fa";
import { Sidebar } from "./Sidebar.jsx";

export const Navbar = () => {
  const [hoveredlink, setHovered] = useState(null);
  const [mobilewidth, setMobile] = useState(window.innerWidth <= 874);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    // it has an empty array which meas it runs only when the componenets mounts (when component enters the dom)
    const handleResize = () => {
      setMobile(window.innerWidth <= 874);
    };
    // when useEffect executed initially it just attaches a resize event listner to window but doesn't do anything as till now window is not resized
    window.addEventListener("resize", handleResize);
    // when the elemnt demounts the event listner is removed ...
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={styles.navcontainer}>
      <img className={styles.navimg} src={logo} alt="Logo" />
      {mobilewidth ? (
        <>
          <span className={styles.toggles} onClick={sidebar}>
            <FaBars className={styles.t} />
          </span>
          {isSidebarOpen && <Sidebar closeSidebar={closeSidebar} />}
        </>
      ) : (
        <>
          <div
            className={styles.anchor}
            onMouseEnter={() => setHovered("home")}
            onMouseLeave={() => setHovered(null)}
          >
            <a
              href="#home"
              className={styles.content}
              style={{ color: hoveredlink === "home" ? "#69a71f" : "black" }} // Change color only for 'home'
            >
              Home
            </a>
            {hoveredlink === "home" && (
              <div className={styles.popup}>Home Page</div>
            )}
          </div>

          <div
            className={styles.anchor}
            onMouseEnter={() => setHovered("about")}
            onMouseLeave={() => setHovered(null)}
          >
            <a
              href="#about"
              className={styles.content}
              style={{ color: hoveredlink === "about" ? "#69a71f" : "black" }} // Change color only for 'about'
            >
              About Us
            </a>
            {hoveredlink === "about" && (
              <div className={styles.popup}>Know more about us</div>
            )}
          </div>

          <div
            className={styles.anchor}
            onMouseEnter={() => setHovered("services")}
            onMouseLeave={() => setHovered(null)}
          >
            <a
              href="#services"
              className={styles.content}
              style={{
                color: hoveredlink === "services" ? "#69a71f" : "black",
              }} // Change color only for 'services'
            >
              Services
            </a>
            {hoveredlink === "services" && (
              <div className={styles.popup}>Nutrition Guideline</div>
            )}
          </div>

          <div
            className={styles.anchor}
            onMouseEnter={() => setHovered("contact")}
            onMouseLeave={() => setHovered(null)}
          >
            <a
              href="#contact"
              className={styles.content}
              style={{ color: hoveredlink === "contact" ? "#69a71f" : "black" }} // Change color only for 'contact'
            >
              Contact
            </a>
            {hoveredlink === "contact" && (
              <div className={styles.popup}>Email Us</div>
            )}
          </div>
          {/* Your other nav links here */}
          <button className={styles.button}>Get a Quote</button>
        </>
      )}
    </nav>
  );
};
