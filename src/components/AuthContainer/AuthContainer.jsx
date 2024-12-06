import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./AuthContainer.module.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useMobile } from "../../hooks/useMobile";

import { Logo } from "../Svg/Logo";

function AuthContainer({ children }) {
  const { isMobile } = useMobile();

  return (
    <div className={styles.container}>
      {isMobile && (
        <div className={styles.logoContainer}>
          <Logo width={50} height={50} isAnimating={true} />
          <h2>ARTTECH PRODUCTION</h2>
        </div>
      )}

      <div className={styles.loginBlock}>{children}</div>
      <div className={styles.imageBlock}>
        <Logo width={130} height={130} isAnimating={true} />
        <h2>ARTTECH PRODUCTION</h2>
      </div>
    </div>
  );
}

export default AuthContainer;
