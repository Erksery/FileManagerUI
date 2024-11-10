import React, { useRef, useState } from "react";
import axios from "axios";
import Upload from "../Upload/Upload";
import styles from "./Uploader.module.scss";
import { Icon28Cancel } from "@vkontakte/icons";
import { motion } from "framer-motion";
import { useCreateFolder } from "../../hooks/useCreateFolder.js";

function Uploader({ id, openFileUploader, setOpenFileUploader, setFiles }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFolderUpload, setIsFolderUpload] = useState(false);
  const uploadRef = useRef();
  const { createFolder } = useCreateFolder();

  const close = () => {
    setOpenFileUploader(false);
  };

  const createFoldersRecursively = async (filePathParts, parentId) => {
    const folderMap = {};
    let currentParentId = parentId;

    for (const folderName of filePathParts) {
      const currentPath = folderMap[currentParentId]
        ? `${folderMap[currentParentId]}/${folderName}`
        : folderName;

      if (!folderMap[currentPath]) {
        try {
          const newFolderId = await createFolder({
            id: currentParentId,
            name: folderName,
          });
          folderMap[currentPath] = newFolderId;
        } catch (error) {
          console.error("Ошибка при создании папки:", error);
          throw new Error("Ошибка при создании папки.");
        }
      }

      currentParentId = folderMap[currentPath]; // Обновляем текущий родительский ID
    }

    return currentParentId; // Возвращаем ID последней созданной папки
  };

  const createFile = async (selectedFiles) => {
    setLoading(true);
    setError("");

    try {
      if (isFolderUpload) {
        const uploadedFiles = await Promise.all(
          Array.from(selectedFiles).map(async (file) => {
            const filePathParts = file.webkitRelativePath.split("/");
            const fileName = filePathParts.pop();

            // Получаем ID последней созданной папки для файла
            const targetFolderId = await createFoldersRecursively(
              filePathParts,
              id
            );

            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(
              "/api/files/createFile",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                params: {
                  folder: targetFolderId,
                },
              }
            );

            return response.data.file;
          })
        );

        setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
      } else {
        const uploadedFiles = await Promise.all(
          Array.from(selectedFiles).map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(
              "/api/files/createFile",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                params: {
                  folder: id,
                },
              }
            );

            return response.data.file;
          })
        );

        setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
      }

      setOpenFileUploader(false);
    } catch (err) {
      setError("Ошибка при создании файлов");
      console.error("Ошибка при создании файлов", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {openFileUploader && (
        <motion.div
          className={styles.overlay}
          onClick={close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <p>Загрузить</p>
              <button onClick={close} className={styles.closeButton}>
                <Icon28Cancel width={20} />
              </button>
            </div>

            <div className={styles.uploadModeToggle}>
              <label>
                <input
                  type="checkbox"
                  checked={isFolderUpload}
                  onChange={(e) => setIsFolderUpload(e.target.checked)}
                />
                Загрузить как папку
              </label>
            </div>

            <Upload
              ref={uploadRef}
              onUpload={createFile}
              isFolderUpload={isFolderUpload}
            />
            <div className={styles.buttonContainer}>
              <button onClick={close}>Отмена</button>
              <button
                onClick={() => uploadRef.current.upload()}
                disabled={loading}
              >
                {loading ? "Загрузка..." : "Отправить файлы"}
              </button>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default Uploader;
