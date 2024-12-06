import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import styles from "./Image.module.scss";

export const Image = memo(({ id, blur = true }) => {
  const [isLoading, setIsLoading] = useState(true);
  const url = "http://192.168.0.106:3005";
  const imageUrl = `${url}/image/${id}`;
  const compressImage = `${url}/compressedImage/${id}`;

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <div className={styles.loadingPlaceholder}></div>}
      <div
        className={styles.imageContainer}
        style={{
          display: isLoading ? "none" : "block",
        }}
      >
        {blur && (
          <div
            className={styles.backgroundImage}
            style={{ backgroundImage: `url(${compressImage})` }}
          />
        )}

        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={styles.image}
          loading=" lazy"
          src={compressImage}
          onLoad={handleLoad}
          draggable="false"
          alt="Загружаемое изображение"
        />
      </div>
    </>
  );
});
