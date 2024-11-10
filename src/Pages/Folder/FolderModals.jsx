import React from "react";
import Uploader from "../../components/Uploader/Uploader";
import ContextMenu from "../../components/ContextMenu/ContextMenu";
import { AnimatePresence } from "framer-motion";
export const FolderModals = ({
  openFileUploader,
  setOpenFileUploader,
  setFiles,
  setCachedFiles,
  menuVisible,
  id,
  menuButtons,
  menuPosition,
  closeMenu,
}) => {
  return (
    <AnimatePresence>
      {openFileUploader && (
        <Uploader
          id={id}
          openFileUploader={openFileUploader}
          setOpenFileUploader={setOpenFileUploader}
          setFiles={setFiles}
          setCachedFiles={setCachedFiles}
        />
      )}
      {menuVisible && (
        <ContextMenu
          buttons={menuButtons}
          points={menuPosition}
          onClose={closeMenu}
        />
      )}
    </AnimatePresence>
  );
};
