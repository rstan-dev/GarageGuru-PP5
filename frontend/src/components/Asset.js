import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";

const Asset = ({ spinner, icon, message }) => {

    return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner animation="border" />}
      {icon && <i className={icon}></i>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Asset;
