import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./AuthContainer.module.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import blockImage from "../../static/5192904632878359556.jpg";

function AuthContainer({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.loginBlock}>{children}</div>
      <div className={styles.imageBlock}>
        <motion.img
          src={blockImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          loading=" lazy"
          draggable="false"
          alt="Загружаемое изображение"
        />
      </div>
    </div>
  );
}

export default AuthContainer;
