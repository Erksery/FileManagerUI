import React, { useEffect, useState } from "react";
import styles from "./Alert.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../store/slices/errors";
import { useMobile } from "../../hooks/useMobile";

export const Alert = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error.error);
  const { isMobile } = useMobile();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const getBackgroundColor = () => {
    const statusCodeFirstDigit = String(error?.status)?.[0];

    switch (statusCodeFirstDigit) {
      case "4":
        return "#f44336";
      case "5":
        return "#9c27b0";
      default:
        return "#202020";
    }
  };

  return (
    <AnimatePresence>
      {error?.data?.error && (
        <motion.div
          style={{
            backgroundColor: getBackgroundColor(),
            width: isMobile && "90%",
          }}
          className={styles.container}
          initial={{ y: 20, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: 20, opacity: 0, x: "-50%" }}
          transition={{
            duration: 0.2,
          }}
        >
          {error.data.error && error.data.error}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
