import React from "react";
import styles from "./FileList.module.scss";
import Viewer from "../Viewer/Viewer";
import FileModal from "../FileModal/FileModal";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

export const FileList = ({
  files,
  deleteFile,
  editFile,
  openFile,
  setOpenFile,
}) => {
  const menu = useSelector((state) => state.menu.open);
  return (
    <>
      {files.length > 0 ? (
        <>
          <div className={styles.table}>
            {files.map((file, index) => (
              <Viewer
                key={file.id}
                index={index}
                data={file}
                deleteFile={deleteFile}
                editFile={editFile}
                openFile={openFile}
                setOpenFile={setOpenFile}
              />
            ))}
          </div>
          <AnimatePresence>
            {openFile && (
              <FileModal
                files={files}
                openFile={openFile}
                setOpenFile={setOpenFile}
              />
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className={styles.emptyFolderContainer}>Папка пуста</div>
      )}
    </>
  );
};
