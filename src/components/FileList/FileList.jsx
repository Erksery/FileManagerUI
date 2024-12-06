import React, { Suspense } from "react";
import styles from "./FileList.module.scss";
import FileModal from "../FileModal/FileModal";
import { AnimatePresence } from "framer-motion";
import { SkeletonFileContainer } from "../Skeletons/FileContainer/SkeletonFileContainer";

const Viewer = React.lazy(() =>
  import("../Viewer/Viewer").then((module) => ({ default: module.Viewer }))
);

export const FileList = ({
  files,
  deleteFile,
  editFile,
  openFile,
  setOpenFile,
}) => {
  return (
    <>
      {files.length > 0 ? (
        <>
          <div className={styles.table}>
            {files.map((file, index) => (
              <Suspense fallback={<SkeletonFileContainer />} key={file.id}>
                <Viewer
                  index={index}
                  data={file}
                  deleteFile={deleteFile}
                  editFile={editFile}
                  openFile={openFile}
                  setOpenFile={setOpenFile}
                />
              </Suspense>
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
