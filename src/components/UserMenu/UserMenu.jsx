import React from "react";
import styles from "./UserManu.module.scss";

export const UserMenu = () => {
  const exitAccount = () => {
    localStorage.removeItem("token");

    location.reload();
  };
  return (
    <div className={styles.container}>
      <button onClick={exitAccount}>Выйти</button>
    </div>
  );
};
