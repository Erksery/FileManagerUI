import React from "react";
import styles from "./UserMenuMobile.module.scss";
import { UserLogo } from "../UserLogo/UserLogo";
import { Link } from "react-router-dom";

export const UserMenuMobile = ({ user }) => {
  const exitAccount = () => {
    localStorage.removeItem("token");

    location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <UserLogo userData={user} width={100} height={100} />
      </div>
      <div className={styles.infoContainer}>
        <div>
          <h2>{user.login}</h2>
          <p>{user.role}</p>
        </div>
      </div>
      {user.role === "Admin" && (
        <Link to={"/adminPanel"} className={styles.button}>
          Панель администратора
        </Link>
      )}

      <button className={styles.exitButton} onClick={exitAccount}>
        Выйти из аккаунта
      </button>
    </div>
  );
};
