import React from "react";
import styles from "./UserLogo.module.scss";

export const UserLogo = ({ userData }) => {
  return (
    <>
      {userData?.login ? (
        <div className={styles.container}>{userData.login.charAt(0)}</div>
      ) : (
        <div className={styles.container}>?</div>
      )}
    </>
  );
};
