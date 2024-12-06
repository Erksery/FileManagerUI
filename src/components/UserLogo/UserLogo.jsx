import React from "react";
import styles from "./UserLogo.module.scss";

export const UserLogo = ({ userData, width, height }) => {
  return (
    <>
      {userData?.login ? (
        <div
          style={{ width: width, height: height, fontSize: width && width / 3 }}
          className={styles.container}
        >
          {userData.login.charAt(0)}
        </div>
      ) : (
        <div className={styles.container}>?</div>
      )}
    </>
  );
};
