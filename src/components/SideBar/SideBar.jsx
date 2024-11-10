import React, { Fragment, useEffect, useState, useMemo } from "react";
import styles from "./SideBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { FolderContainer } from "../FolderContainer/FolderContainer";
import { Icon24NewsfeedOutline, Icon24Add } from "@vkontakte/icons";
import { setOpen } from "../../store/slices/menu";
import { useCreateFolder } from "../../hooks/useCreateFolder";
import { useFetchFolders } from "../../hooks/useFetchFolders";

export const SideBar = React.memo(({ id }) => {
  const [activeFolder, setActiveFolder] = useState(null);
  const [openFolders, setOpenFolders] = useState([]);
  const [folderModal, setFolderModal] = useState(null);
  const dispatch = useDispatch();
  const { createFolder } = useCreateFolder();
  const { fetchFolders } = useFetchFolders();

  const folders = useSelector((state) => state.folders.folders);
  const menu = useSelector((state) => state.menu.open);

  const filteredFolders = useMemo(() => {
    return folders.filter((folder) => folder.inFolder === null);
  }, [folders]);

  useEffect(() => {
    fetchFolders();
  }, []);

  useEffect(() => {
    const savedOpenFolders = JSON.parse(localStorage.getItem("openFolders"));
    const savedActiveFolder = JSON.parse(localStorage.getItem("activeFolder"));

    if (savedOpenFolders) setOpenFolders(savedOpenFolders);
    if (savedActiveFolder) setActiveFolder(savedActiveFolder);
  }, []);

  useEffect(() => {
    localStorage.setItem("openFolders", JSON.stringify(openFolders));
    localStorage.setItem("activeFolder", JSON.stringify(activeFolder));
  }, [openFolders, activeFolder]);

  return (
    <div className={styles.panel} style={{ display: !menu ? "none" : "flex" }}>
      <div className={styles.menuHeader}>
        <button onClick={createFolder} className={styles.menuButton}>
          <Icon24Add width={20} />
        </button>
        <button
          onClick={() => dispatch(setOpen(false))}
          className={styles.menuButton}
        >
          <Icon24NewsfeedOutline width={20} />
        </button>
      </div>

      <div className={styles.foldersList}>
        {filteredFolders.map((folder) => (
          <Fragment key={folder.id}>
            <FolderContainer
              margin={0}
              width={100}
              folder={folder}
              folders={folders}
              activeFolder={activeFolder}
              setActiveFolder={setActiveFolder}
              openFolders={openFolders}
              setOpenFolders={setOpenFolders}
              folderModal={folderModal}
              setFolderModal={setFolderModal}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
});

export default SideBar;
