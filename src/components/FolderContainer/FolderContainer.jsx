import React, { Fragment, useEffect, useRef, useState } from "react";
import styles from "./FolderContainer.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Icon24Folder,
  Icon24ChevronDownSmall,
  Icon24MoreVertical,
  Icon24NewsfeedOutline,
  Icon24FolderSimpleLockOutline,
  Icon24FolderSimpleUserOutline,
} from "@vkontakte/icons";
import { ModalMenu } from "../ModalMenu/ModalMenu";
import { useDeleteFolder } from "../../hooks/useDeleteFolder";
import { FolderModal } from "../FolderModal/FolderModal";
import { AnimatePresence } from "framer-motion";

export const FolderContainer = ({
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
  const { deleteFolder } = useDeleteFolder();

  const subFolders = folders.filter(
    (subFolder) => subFolder.inFolder === folder.id
  );
  const isOpen = openFolders.includes(folder.id);

  const toggleFolder = () => {
    if (isOpen) {
      setOpenFolders((prev) => prev.filter((id) => id !== folder.id));
    } else {
      setOpenFolders((prev) => [...prev, folder.id]);
    }
  };

  const privacyLabel =
    folder.privacy === "Private"
      ? {
          icon: <Icon24FolderSimpleLockOutline />,
          text: "Личный",
        }
      : {
          icon: <Icon24FolderSimpleUserOutline />,
          text: "Публичный",
        };

  const menuButtons = [
    {
      icon: <Icon24Folder />,
      name: "Параметры",
      event: (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setFolderSettingsModal(true);
        toggleModal();
      },
    },
    {
      icon: <Icon24Folder />,
      name: "Удалить",
      event: (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        deleteFolder(folder.id);
        toggleModal();
      },
    },
  ];

  const toggleModal = () => {
    if (folderModal === null) {
      setFolderModal(folder.id);
    } else {
      setFolderModal(null);
    }
  };

  return (
    <Fragment key={folder.id}>
      <AnimatePresence>
        {folderSettingsModal && (
          <FolderModal
            folder={folder}
            open={folderSettingsModal}
            setOpen={setFolderSettingsModal}
          />
        )}
      </AnimatePresence>

      <div
        style={{ marginLeft: margin, width: `${width}%` }}
        className={styles.foldersList}
      >
        <Link
          onClick={(e) => {
            setActiveFolder(folder.id);
          }}
          style={{
            backgroundColor:
              activeFolder === folder.id
                ? "rgba(50,50,50,255)"
                : "rgba(23, 23, 23)",
          }}
          to={`/folder/${folder.id}`}
          className={styles.folderButton}
        >
          <div className={styles.nameContainer}>
            <div className={styles.nameFolder}>
              {privacyLabel.icon}
              <p>{folder.name}</p>
            </div>

            <div>
              <p className={styles.creator}>Создал: {folder.creator.login}</p>
            </div>
          </div>

          {folderModal === folder.id && (
            <ModalMenu
              buttons={menuButtons}
              open={folderModal}
              setOpen={setFolderModal}
            />
          )}

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
};
