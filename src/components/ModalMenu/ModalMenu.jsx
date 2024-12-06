import React, { useEffect, useRef } from "react";
import styles from "./ModalMenu.module.scss";
import { motion } from "framer-motion";

export const ModalMenu = ({ buttons, setOpen }) => {
  const modalRef = useRef();

  const closeMenu = () => {
    setOpen(null);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [closeMenu]);

  return (
    <motion.div
      ref={modalRef}
      className={styles.folderMenu}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
    >
      {buttons &&
        buttons.map((button, index) => (
          <button
            style={{ color: button.color }}
            key={index}
            onClick={button.event}
          >
            {button.icon}
            {button.name}
          </button>
        ))}
    </motion.div>
  );
};
