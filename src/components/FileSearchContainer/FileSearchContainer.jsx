import React from "react";
import styles from "./FileSearchContainer.module.scss";
import { Icon24FolderSimpleLockOutline } from "@vkontakte/icons";

export const FileSearchContainer = ({ file }) => {
  return (
    <div key={file.id} className={styles.container}>
      <div className={styles.iconContainer}>
        <Icon24FolderSimpleLockOutline width={32} height={32} />
      </div>
      <div className={styles.fileInfo}>
        <p>{file.originalName}</p>
        <div className={styles.additionalInfo}>
          <p>{file.type}</p>
        </div>
      </div>
    </div>
  );
};
