import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Image.module.scss";

function Image({ id, blur = true }) {
  const [isLoading, setIsLoading] = useState(true);
  const imageUrl = `http://localhost:3005/image/${id}`;

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className={styles.loadingPlaceholder}>Загрузка...</div>
      )}
      <div
        className={styles.imageContainer}
        style={{
          display: isLoading ? "none" : "block",
        }}
      >
        {blur && (
          <div
            className={styles.backgroundImage}
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        )}

        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={styles.image}
          loading=" lazy"
          src={imageUrl}
          onLoad={handleLoad}
          draggable="false"
          alt="Загружаемое изображение"
        />
      </div>
    </>
  );
}

export default React.memo(Image);
