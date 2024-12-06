import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useLayoutEffect,
} from "react";
import styles from "./SideBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { FolderContainer } from "../FolderContainer/FolderContainer";
import { Icon24NewsfeedOutline, Icon24Add } from "@vkontakte/icons";
import { setOpen } from "../../store/slices/menu";
import { useCreateFolder } from "../../hooks/useCreateFolder";
import { useFetchFolders } from "../../hooks/useFetchFolders";
import { useMobile } from "../../hooks/useMobile";
import { AnimatePresence, motion } from "framer-motion";

export const SideBar = React.memo(({ id }) => {
  const [activeFolder, setActiveFolder] = useState(id);
  const [openFolders, setOpenFolders] = useState([]);
  const [folderModal, setFolderModal] = useState(null);

  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const { createFolder } = useCreateFolder();
  const { fetchFolders } = useFetchFolders();
  const { isMobile } = useMobile();

  const folders = useSelector((state) => state.folders.folders);
  const menu = useSelector((state) => state.menu.open);

  const filteredFolders = useMemo(() => {
    return folders.filter((folder) => folder.inFolder === null);
  }, [folders]);

  useLayoutEffect(() => {
    if (isMobile && menu) {
      dispatch(setOpen(false));
    } else {
      dispatch(setOpen(true));
    }
  }, [isMobile]);

  useEffect(() => {
    if (menu && isMobile) {
      document.body.classList.add("block-scroll");
    } else {
      document.body.classList.remove("block-scroll");
    }

    return () => {
      document.body.classList.remove("block-scroll");
    };
  }, [menu]);

  useEffect(() => {
    fetchFolders();
    const savedOpenFolders =
      JSON.parse(localStorage.getItem("openFolders")) || [];
    setOpenFolders(savedOpenFolders);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (menu) {
          dispatch(setOpen(false));
        }
      }
    };

    if (isMobile) {
      document.addEventListener("mouseup", handleClickOutside);
      return () => {
        document.removeEventListener("mouseup", handleClickOutside);
      };
    }
  }, [isMobile, dispatch, menu]);

  useEffect(() => {
    localStorage.setItem("openFolders", JSON.stringify(openFolders));
    localStorage.setItem("activeFolder", JSON.stringify(activeFolder));
  }, [openFolders, activeFolder]);

  return (
    <AnimatePresence>
      {menu && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={styles.background}
        >
          <motion.div
            ref={menuRef}
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -150, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.panel}
          >
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
                <FolderContainer
                  key={folder.id}
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
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default SideBar;
