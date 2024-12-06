import React from "react";
import { motion } from "framer-motion"; // Импорт framer-motion
import styles from "./FileSearchContainer.module.scss";
import { Icon24FolderSimpleLockOutline } from "@vkontakte/icons";
import { Image } from "../Image/Image";

export const FileSearchContainer = ({ file }) => {
  return (
    <motion.div
      key={file.id}
      className={styles.container}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.iconContainer}>
        <Image id={file.name} />
      </div>
      <div className={styles.fileInfo}>
        <p>{file.originalName}</p>
        <div className={styles.additionalInfo}>
          <p>{file.type}</p>
        </div>
      </div>
    </motion.div>
  );
};
