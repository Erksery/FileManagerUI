import React, { useMemo, useCallback, useRef, useEffect } from "react";
import styles from "./ContextMenu.module.scss";
import { motion } from "framer-motion";

function ContextMenu({ buttons = [], points = { x: 0, y: 0 }, onClose }) {
  const menuRef = useRef(null);

  const handleClick = useCallback(
    (eventButton) => {
      eventButton();
      onClose();
    },
    [onClose]
  );

  const menuWidth = 200;
  const menuHeight = 40 * buttons.length;
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  const { adjustedX, adjustedY } = useMemo(() => {
    const isMenuOutOfView = points.y + menuHeight > windowHeight;
    const adjustedY = isMenuOutOfView ? points.y - menuHeight - 20 : points.y;
    const adjustedX =
      points.x + menuWidth > windowWidth
        ? windowWidth - menuWidth - 30
        : points.x;
    return { adjustedX, adjustedY };
  }, [points, menuHeight, windowHeight, windowWidth]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={menuRef}
      key={`${adjustedX}-${adjustedY}`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{
        ease: "easeInOut",
      }}
      style={{ top: adjustedY, left: adjustedX }}
      className={styles.container}
    >
      {buttons.map((button) => (
        <button
          onClick={() => handleClick(button.event)}
          key={button.id}
          style={{
            color: button.color,
            backgroundColor: button.backgroundColor,
          }}
          className={styles.button}
        >
          {button.icon}
          {button.name}
        </button>
      ))}
    </motion.div>
  );
}

export default ContextMenu;
