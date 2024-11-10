import React, { useEffect, useRef } from "react";
import styles from "./ModalContainer.module.scss";
import { AnimatePresence, motion } from "framer-motion";

export const ModalContainer = ({ close, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        close();
      }
    };

    window.addEventListener("mouseup", handleClickOutside);

    return () => {
      window.removeEventListener("mouseup", handleClickOutside);
    };
  }, [close]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={styles.background}
    >
      <div ref={modalRef} className={styles.modalContainer}>
        {children}
      </div>
    </motion.div>
  );
};
