import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./FolderContainer.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Icon24FolderOutline,
  Icon24ChevronDownSmall,
  Icon24MoreVertical,
  Icon24NewsfeedOutline,
  Icon24FolderSimpleLockOutline,
  Icon24FolderSimpleUserOutline,
  Icon24DeleteOutlineAndroid,
} from "@vkontakte/icons";
import { ModalMenu } from "../ModalMenu/ModalMenu";
import { useDeleteFolder } from "../../hooks/useDeleteFolder";
import { FolderModal } from "../FolderModal/FolderModal";
import { AnimatePresence } from "framer-motion";
import { useMobile } from "../../hooks/useMobile";
import { FolderSettingsMobile } from "../FolderSettingsMobile/FolderSettingsMobile";

export const FolderContainer = React.memo(
  ({
    folder,
    folders,
    activeFolder,
    setActiveFolder,
    margin,
    width,
    openFolders,
    setOpenFolders,
    folderModal,
    setFolderModal,
  }) => {
    const [folderSettingsModal, setFolderSettingsModal] = useState(false);
    const { isMobile } = useMobile();
    const { deleteFolder } = useDeleteFolder();

    const subFolders = useMemo(
      () => folders.filter((subFolder) => subFolder.inFolder === folder.id),
      [folders, folder.id]
    );

    const isOpen = useMemo(
      () => openFolders.includes(folder.id),
      [openFolders, folder.id]
    );

    const toggleFolder = useCallback(() => {
      setOpenFolders((prev) =>
        prev.includes(folder.id)
          ? prev.filter((id) => id !== folder.id)
          : [...prev, folder.id]
      );
    }, [folder.id, setOpenFolders]);

    const toggleModal = useCallback(() => {
      setFolderModal((prev) => (prev === folder.id ? null : folder.id));
    }, [folder.id, setFolderModal]);

    const privacyLabel =
      folder.privacy === "Private"
        ? {
            icon: <Icon24FolderSimpleLockOutline />,
            text: "Личный",
            color: "#ff4a53",
          }
        : {
            icon: <Icon24FolderSimpleUserOutline />,
            text: "Публичный",
            color: "#4aff68",
          };

    const menuButtons = [
      {
        icon: <Icon24FolderOutline width={20} fill="white" />,
        name: "Параметры",
        event: (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          setFolderSettingsModal(true);
          toggleModal();
        },
        color: "white",
      },
      {
        icon: <Icon24DeleteOutlineAndroid width={20} fill="#ff4a53" />,
        name: "Удалить",
        event: (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          deleteFolder(folder.id);
          toggleModal();
        },
        color: "#ff4a53",
      },
    ];

    return (
      <Fragment key={folder.id}>
        {isMobile ? (
          <FolderSettingsMobile
            folder={folder}
            open={folderSettingsModal}
            setOpen={setFolderSettingsModal}
          />
        ) : (
          <FolderModal
            folder={folder}
            open={folderSettingsModal}
            setOpen={setFolderSettingsModal}
          />
        )}

        <div
          style={{ marginLeft: margin, width: `${width}%` }}
          className={styles.foldersList}
        >
          <Link
            onClick={(e) => {
              setActiveFolder(folder.id);
            }}
            style={
              activeFolder && {
                backgroundColor:
                  Number(activeFolder) === folder.id
                    ? "rgba(50,50,50,255)"
                    : "rgba(23, 23, 23)",
              }
            }
            to={`/folder/${folder.id}`}
            className={styles.folderButton}
          >
            <div className={styles.infoContainer}>
              <div
                style={{ backgroundColor: privacyLabel.color }}
                className={styles.indicator}
              />
              <div className={styles.nameContainer}>
                <div className={styles.nameFolder}>
                  {privacyLabel.icon}
                  <p>{folder.name}</p>
                </div>

                <div>
                  <p className={styles.creator}>
                    Создал: {folder.creator.login}
                  </p>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {folderModal === folder.id && (
                <ModalMenu
                  buttons={menuButtons}
                  open={folderModal}
                  setOpen={setFolderModal}
                />
              )}
            </AnimatePresence>
            <div className={styles.buttonsContainer}>
              {subFolders.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    toggleFolder();
                  }}
                  className={styles.chevron}
                >
                  <div
                    className={styles.chevronIcon}
                    style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}
                  >
                    <Icon24ChevronDownSmall width={20} />
                  </div>
                </button>
              )}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                  toggleModal();
                }}
                type="button"
                className={styles.chevron}
              >
                <Icon24MoreVertical width={20} height={20} />
              </button>
            </div>
          </Link>

          {isOpen &&
            subFolders.length > 0 &&
            subFolders.map((subFolder) => (
              <div key={subFolder.id} className={styles.subFolder}>
                <hr className={styles.line} />
                <FolderContainer
                  key={subFolder.id}
                  margin={10}
                  width={95}
                  folder={subFolder}
                  folders={folders}
                  activeFolder={activeFolder}
                  setActiveFolder={setActiveFolder}
                  openFolders={openFolders}
                  setOpenFolders={setOpenFolders}
                  folderModal={folderModal}
                  setFolderModal={setFolderModal}
                />
              </div>
            ))}
        </div>
      </Fragment>
    );
  }
);
