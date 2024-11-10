import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { UserLogo } from "../UserLogo/UserLogo";
import { Icon24Article } from "@vkontakte/icons";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../store/slices/menu";

function Header({ userData }) {
  const menu = useSelector((state) => state.menu.open);
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <button
          onClick={() => dispatch(setOpen(!menu))}
          className={styles.menuButton}
        >
          <Icon24Article width={22} />
        </button>

      </div>

      <div className={styles.authContainer}>
        {userData && userData.userLogin ? (
          <UserLogo userData={userData} />
        ) : (
          <div className={styles.authenticate}>
            <Link to={"/registration"}>Регистрация</Link>
            <Link to={"/login"}>Войти</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
