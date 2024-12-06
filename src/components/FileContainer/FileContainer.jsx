import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  Fragment,
  memo,
  useMemo,
} from "react";
import styles from "./FileContainer.module.scss";
import {
  Icon16MoreHorizontal,
  Icon24WriteOutline,
  Icon24DeleteOutline,
  Icon24Folder,
  Icon24ViewOutline,
  Icon24DownloadOutline,
} from "@vkontakte/icons";
import { AnimatePresence, motion } from "framer-motion";
import { FileMenu } from "../FileMenu/FileMenu";
import { FileMenuMobile } from "../FileMenuMobile/FileMenuMobile";
import { useMobile } from "../../hooks/useMobile";
import { SkeletonFileContainer } from "../Skeletons/FileContainer/SkeletonFileContainer";

export const FileContainer = memo(
  ({ children, data, deleteFile, editFile, setOpenFile, index }) => {
    const [fileMenu, setFileMenu] = useState(false);
    const [editName, setEditName] = useState(false);
    const [editedFileName, setEditedFileName] = useState(data.originalName);
    const [menuPosition, setMenuPosition] = useState({ top: 30, right: 0 });
    const [isVisible, setIsVisible] = useState(false);

    const containerRef = useRef();
    const fileContainerRef = useRef();
    const observerRef = useRef();

    const { isMobile } = useMobile();

    const handleEditFileName = useCallback(() => {
      setEditName(true);
      setFileMenu(false);
    }, []);

    const menuButtons = useMemo(
      () => [
        {
          id: 1,
          icon: <Icon24ViewOutline width={20} />,
          name: "Открыть",
          event: (e) => {
            e.stopPropagation();
            setOpenFile(index + 1);
            setFileMenu(false);
          },
          separator: true,
          color: "white",
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
          color: "white",
        },
        {
          id: 3,
          icon: <Icon24DownloadOutline width={20} />,
          name: "Скачать",
          event: (e) => {
            window.open(`http://192.168.0.5:3005/image/${data.name}`);
            setFileMenu(false);
          },
          separator: false,
          color: "white",
        },
        {
          id: 4,
          icon: <Icon24DeleteOutline width={20} />,
          name: "Удалить",
          event: (e) => {
            e.stopPropagation();
            deleteFile(data.id);
            setFileMenu(false);
          },
          separator: false,
          color: "#ff4a53",
        },
      ],
      [setOpenFile, index, handleEditFileName, data.name, deleteFile]
    );

    const toggleMenu = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
      setFileMenu((prev) => !prev);
    }, []);

    useEffect(() => {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            observerRef.current.unobserve(entry.target);
          }
        },
        {
          threshold: 0.1,
        }
      );

      if (fileContainerRef.current) {
        observerRef.current.observe(fileContainerRef.current);
      }

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }, []);

    useEffect(() => {
      if (fileMenu) {
        const menuRect = containerRef.current.getBoundingClientRect();
        const containerRect = fileContainerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const top =
          menuRect.height < windowHeight - containerRect.bottom - 100
            ? 30
            : -(menuRect.height + 160);

        setMenuPosition({ top });
      }
    }, [fileMenu]);

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
          setFileMenu(false);
        }
      };

      window.addEventListener("click", handleClickOutside);

      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }, [setFileMenu]);

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
        {isVisible ? (
          <>
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
                      <Icon16MoreHorizontal width={16} height={16} />
                    </button>

                    {isMobile ? (
                      <FileMenuMobile
                        fileMenu={fileMenu}
                        setFileMenu={setFileMenu}
                        menuPosition={menuPosition}
                        menuButtons={menuButtons}
                      />
                    ) : (
                      <FileMenu
                        fileMenu={fileMenu}
                        menuPosition={menuPosition}
                        menuButtons={menuButtons}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <SkeletonFileContainer />
        )}
      </div>
    );
  }
);
