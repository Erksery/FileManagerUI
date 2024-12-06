import React, { useEffect, useRef, useLayoutEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./MobileMenu.module.scss";
import { Icon16ArrowTriangleUp } from "@vkontakte/icons";

export const MobileMenu = React.memo(({ open, setOpen, children }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [setOpen]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("block-scroll");
    } else {
      document.body.classList.remove("block-scroll");
    }

    return () => {
      document.body.classList.remove("block-scroll");
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.background}
        >
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 300 }}
            transition={{ duration: 0.3 }}
            className={styles.container}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
