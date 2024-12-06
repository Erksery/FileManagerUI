import React, { Fragment } from "react";
import styles from "./FileMenu.module.scss";
import { AnimatePresence, motion } from "framer-motion";

export const FileMenu = ({ fileMenu, menuPosition, menuButtons }) => {
  return (
    <AnimatePresence>
      {fileMenu && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{
            ease: "easeInOut",
          }}
          style={{
            right: `0px`,
            top: `${menuPosition.top}px`,
          }}
          className={styles.fileMenu}
        >
          {menuButtons.map((button, idx) => (
            <Fragment key={button.id}>
              <button key={idx} onClick={button.event}>
                {button.icon}
                {button.name}
              </button>
              {button.separator && <hr />}
            </Fragment>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
