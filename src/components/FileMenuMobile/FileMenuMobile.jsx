import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import styles from "./FileMenuMobile.module.scss";

export const FileMenuMobile = ({
  fileMenu,
  setFileMenu,
  menuPosition,
  menuButtons,
}) => {
  return (
    <div className={styles.container}>
      <MobileMenu open={fileMenu} setOpen={setFileMenu}>
        <div className={styles.menuContainer}>
          {menuButtons &&
            menuButtons.map((button) => (
              <button
                style={{ color: `${button.color}` }}
                key={button.id}
                onClick={button.event}
              >
                {button.icon}
                {button.name}
              </button>
            ))}
        </div>
      </MobileMenu>
    </div>
  );
};
