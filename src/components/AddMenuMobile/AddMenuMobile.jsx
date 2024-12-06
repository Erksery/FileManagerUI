import React from "react";
import styles from "./AddMenuMobile.module.scss";

export const AddMenuMobile = ({ addButtons, setOpenMobileMenu }) => {
  return (
    <div className={styles.container}>
      {addButtons &&
        addButtons.map((button) => (
          <button key={button.id} onClick={button.event}>
            {button.icon}
            <p>{button.name}</p>
          </button>
        ))}
    </div>
  );
};
