import React, { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./Upload.module.scss";
import {
  Icon24DocumentPlusOutline,
  Icon24DocumentTextOutline,
} from "@vkontakte/icons";

const Upload = forwardRef(({ onUpload, isFolderUpload }, ref) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (newFiles) => {
    if (!newFiles) return;
    setFiles((prevFiles) => [...prevFiles, ...Array.from(newFiles)]);
  };

  const handleFileChange = (event) => {
    handleFile(event.target.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleFile(event.dataTransfer.files);
    setIsDragging(false);
  };

  useImperativeHandle(ref, () => ({
    upload() {
      if (files.length > 0) {
        onUpload(files);
      }
    },
  }));

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        backgroundColor: isDragging ? "rgb(40, 40, 40)" : "rgb(22, 22, 22)",
      }}
      className={styles.uploadContainer}
    >
      <label htmlFor="file-upload">
        <input
          type="file"
          id="file-upload"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
          {...(isFolderUpload && { webkitdirectory: "true" })}
        />
        {files.length > 0 ? (
          <div className={styles.filesList}>
            <p>{files.length} файл(ов) выбрано</p>
            {files.map((file, index) => (
              <div key={index} className={styles.fileContainer}>
                <div className={styles.iconContainer}>
                  <Icon24DocumentTextOutline width={32} height={32} />
                </div>
                <div className={styles.fileInfo}>
                  <p>{file.name}</p>
                  <div className={styles.additionalInfo}>
                    <p>{file.type}</p>
                    <p>{(file.size / 1024).toFixed(2)} КБ</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.fileUpload}>
            <Icon24DocumentPlusOutline width={56} height={56} />
            <div>
              <p>Перетащите файлы или </p>
              <p>
                <span>нажмите</span> для загрузки
              </p>
            </div>
          </div>
        )}
      </label>
    </div>
  );
});

export default Upload;
