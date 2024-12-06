import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import styles from "./Folder.module.scss";
import FileViewer from "../../components/FileViewer/FileViewer";

import { useParams } from "react-router-dom";
import { useContextMenu } from "../../hooks/useContextMenu";
import { useFetchFolders } from "../../hooks/useFetchFolders";
import { useFetchFiles } from "../../hooks/useFetchFiles";
import { useCreateFolder } from "../../hooks/useCreateFolder";
import { useDeleteFile } from "../../hooks/useDeleteFile";
import { useEditFile } from "../../hooks/useEditFile";
import { FolderModals } from "./FolderModals";
import { FileList } from "../../components/FileList/FileList";
import { SideBar } from "../../components/SideBar/SideBar";
import {
  Icon24FolderSimplePlusOutline,
  Icon24DocumentPlusOutline,
  Icon24InfoCircleOutline,
  Icon24DeleteOutlineAndroid,
} from "@vkontakte/icons";
import { BottomMenu } from "../../components/BottomMenu/BottomMenu";

function Folder() {
  const [openFileUploader, setOpenFileUploader] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openFile, setOpenFile] = useState(null);
  const { id } = useParams();
  const containerRef = useRef();
  const { openMenu, menuVisible, menuPosition, menuButtons, closeMenu } =
    useContextMenu();
  const { files, setFiles, fetchFiles, setCachedFiles } = useFetchFiles(id);
  const { createFolder } = useCreateFolder();
  const { deleteFile } = useDeleteFile(id, setFiles);
  const { editFile } = useEditFile(id);

  const contextButtons = useMemo(
    () => [
      {
        id: 1,
        name: "Создать папку",
        event: () => {
          createFolder({ id }), setOpenMobileMenu(false);
        },
        icon: <Icon24FolderSimplePlusOutline width={20} />,
        color: null,
        backgroundColor: null,
      },
      {
        id: 2,
        name: "Добавить файл",
        event: () => {
          setOpenFileUploader(true), setOpenMobileMenu(false);
        },
        icon: <Icon24DocumentPlusOutline width={20} />,
        color: null,
        backgroundColor: null,
      },
    ],
    [createFolder]
  );

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [closeMenu]);

  return (
    <div className="container">
      <SideBar id={id} />

      <FileViewer id={id}>
        <div
          ref={containerRef}
          onContextMenu={(e) => openMenu(e, contextButtons)}
          className={styles.container}
        >
          <FolderModals
            openFileUploader={openFileUploader}
            setOpenFileUploader={setOpenFileUploader}
            setFiles={setFiles}
            setCachedFiles={setCachedFiles}
            menuVisible={menuVisible}
            id={id}
            menuButtons={menuButtons}
            menuPosition={menuPosition}
            closeMenu={closeMenu}
          />
          <FileList
            files={files}
            deleteFile={deleteFile}
            editFile={editFile}
            openFile={openFile}
            setOpenFile={setOpenFile}
          />
        </div>
      </FileViewer>
      <BottomMenu
        id={id}
        addButtons={contextButtons}
        openMobileMenu={openMobileMenu}
        setOpenMobileMenu={setOpenMobileMenu}
      />
    </div>
  );
}

export default Folder;
