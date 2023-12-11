import React from "react";
import styles from "../styles/BackToTop.module.css";

/*
  Scrolls back to top of screen when button is clicked
*/
const BackToTop = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={styles.UpArrowButton}
      onClick={handleClick}
      aria-label="Back to top"
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
};

export default BackToTop;