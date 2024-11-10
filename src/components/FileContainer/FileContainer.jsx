import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import styles from "./FileContainer.module.scss";
import {
  Icon16MoreHorizontal,
  Icon24WriteOutline,
  Icon24DeleteOutlineAndroid,
  Icon24Folder,
  Icon24ViewOutline,
} from "@vkontakte/icons";
import { AnimatePresence, motion } from "framer-motion";

function FileContainer({
  children,
  data,
  deleteFile,
  editFile,
  openFile,
  setOpenFile,
  index,
}) {
  const [fileMenu, setFileMenu] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editedFileName, setEditedFileName] = useState(data.originalName);
  const [menuPosition, setMenuPosition] = useState({ top: 30, right: 0 });

  const containerRef = useRef();
  const fileContainerRef = useRef();

  const formattedDate = new Date(data.createdAt).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const menuButtons = [
    {
      id: 1,
      icon: <Icon24ViewOutline width={20} />,
      name: "Открыть",
      event: (e) => {
        e.stopPropagation();
      },
      separator: true,
    },
    {
      id: 2,
      icon: <Icon24WriteOutline width={20} />,
      name: "Переименовать",
      event: (e) => {
        e.stopPropagation();
        handleEditFileName();
      },
      separator: false,
    },
    {
      id: 3,
      icon: <Icon24DeleteOutlineAndroid width={20} />,
      name: "Удалить",
      event: (e) => {
        e.stopPropagation();
        deleteFile(data.id);
      },
      separator: false,
    },
  ];

  const toggleMenu = (e) => {
    e.preventDefault;
    e.stopPropagation();
    setFileMenu((prev) => !prev);
  };

  const handleEditFileName = () => {
    setEditName(true);
    setFileMenu(false);
  };

  const handleClickOutside = useCallback(
    (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFileMenu(false);
      }
      if (
        fileContainerRef.current &&
        !fileContainerRef.current.contains(e.target)
      ) {
        if (editName) {
          setEditName(false);
          setEditedFileName(data.originalName);
        }
      }
    },
    [editName, data.originalName]
  );
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (fileMenu) {
      const menuRect = containerRef.current.getBoundingClientRect();
      const containerRect = fileContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      const top =
        menuRect.height < windowHeight - containerRect.bottom
          ? 30
          : -(menuRect.height + 115);

      setMenuPosition({ top });
    }
  }, [fileMenu]);

  const handleSaveFileName = (e) => {
    e.preventDefault();

    data.originalName = editedFileName;
    setEditName(false);

    editFile(data.id, editedFileName);
  };

  return (
    <div
      ref={fileContainerRef}
      style={{ backgroundColor: editName && "#212121" }}
      className={styles.container}
    >
      <div
        onDoubleClick={() => setOpenFile(index + 1)}
        className={styles.imageContainer}
      >
        {children}
      </div>
      <div className={styles.nameContainer}>
        {editName ? (
          <form onSubmit={handleSaveFileName}>
            <input
              value={editedFileName}
              onChange={(e) => setEditedFileName(e.target.value)}
              autoFocus
            />
          </form>
        ) : (
          <>
            <div className={styles.infoContainer}>
              <div className={styles.info}>
                <p>{data.type}</p>
              </div>
              <div className={styles.name}>{data.originalName}</div>
            </div>
            <div ref={containerRef} className={styles.menuContainer}>
              <button onClick={toggleMenu} className={styles.menuButton}>
                <Icon16MoreHorizontal width={18} height={18} />
              </button>
              <AnimatePresence>
                {fileMenu && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{
                      ease: "easeInOut",
                    }}
                    style={{
                      right: `0px`,
                      top: `${menuPosition.top}px`,
                    }}
                    className={styles.fileMenu}
                  >
                    {menuButtons.map((button, idx) => (
                      <Fragment key={button.id}>
                        <button key={idx} onClick={button.event}>
                          {button.icon}
                          {button.name}
                        </button>
                        {button.separator && <hr />}
                      </Fragment>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FileContainer;
