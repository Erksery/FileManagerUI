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

function Folder() {
  const [openFileUploader, setOpenFileUploader] = useState(false);
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
        event: () => createFolder({ id }),
        icon: <Icon24FolderSimplePlusOutline width={20} />,
        color: null,
        backgroundColor: null,
      },
      {
        id: 2,
        name: "Добавить файл",
        event: () => setOpenFileUploader(true),
        icon: <Icon24DocumentPlusOutline width={20} />,
        color: null,
        backgroundColor: null,
      },
      {
        id: 3,
        name: "Сведения",
        event: () => console.log("В разработке"),
        icon: <Icon24InfoCircleOutline width={20} />,
        color: null,
        backgroundColor: null,
      },
      {
        id: 4,
        name: "Удалить",
        event: () => console.log("В разработке"),
        icon: <Icon24DeleteOutlineAndroid width={20} fill="#f7848f" />,
        color: "#f7848f",
        backgroundColor: "#ff000d2c",
      },
    ],
    [createFolder]
  );

  /*useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);*/

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
    </div>
  );
}

export default Folder;
