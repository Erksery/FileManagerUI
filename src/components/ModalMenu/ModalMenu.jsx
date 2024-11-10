import React, { useEffect, useRef } from "react";
import styles from "./ModalMenu.module.scss";

export const ModalMenu = ({ buttons, open, setOpen }) => {
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
    <div ref={modalRef} className={styles.folderMenu}>
      {buttons &&
        buttons.map((button, index) => (
          <button key={index} onClick={button.event}>
            {button.icon}
            {button.name}
          </button>
        ))}
    </div>
  );
};
