import React, { useState, useRef } from "react";
import styles from "./FolderModal.module.scss";
import { ModalContainer } from "../ModalContainer/ModalContainer";
import {
  Icon28Cancel,
  Icon24FolderSimpleLockOutline,
  Icon24FolderSimpleUserOutline,
} from "@vkontakte/icons";
import { useEditFolder } from "../../hooks/useEditFolder";
import { AnimatePresence } from "framer-motion";

export const FolderModal = ({ folder, open, setOpen }) => {
  const [editFolderData, setEditFolderData] = useState({
    name: folder.name || "",
    privacy: folder.privacy,
  });
  const [privacyModalSelector, setPrivacyModalSelector] = useState(false);
  const { editFolder } = useEditFolder();
  const inputRef = useRef(null);

  const privacy = [
    {
      id: 1,
      name: "Public",
      ruName: "Публичн",
      description:
        "Открывает доступ для всех пользователей. Редактирование имени и уровня доступа может осуществлять только создатель папки, а так же администрация.",
    },
    {
      id: 2,
      name: "Private",
      ruName: "Приватн",
      description: "Доступ предоставляется исключительно создателю папки.",
    },
  ];

  const currentPrivacy = privacy.find((p) => p.name === editFolderData.privacy);
  const selectionPrivacy = privacy.filter((p) => p !== currentPrivacy);

  const close = () => setOpen(!open);

  const submitEditFolder = (e) => {
    e.preventDefault();
    editFolder(folder.id, editFolderData);
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <AnimatePresence>
      {open && (
        <ModalContainer close={close}>
          <div className={styles.container}>
            <div className={styles.modalHeader}>
              <p>Настройки папки</p>
              <button onClick={close}>
                <Icon28Cancel width={20} />
              </button>
            </div>

            <form onSubmit={submitEditFolder} className={styles.editFolder}>
              <div className={styles.inputContainer} onClick={focusInput}>
                <p>Имя папки</p>
                <input
                  ref={inputRef}
                  value={editFolderData.name}
                  onChange={(e) =>
                    setEditFolderData({
                      ...editFolderData,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className={styles.privacySelector}>
                <label htmlFor="privacy">Доступ:</label>
                {privacyModalSelector && (
                  <div className={styles.privacyModal}>
                    {selectionPrivacy.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setPrivacyModalSelector((prev) => !prev);
                          setEditFolderData({
                            ...editFolderData,
                            privacy: item.name,
                          });
                        }}
                        className={styles.privacyCard}
                      >
                        <div className={styles.iconContainer}>
                          <Icon24FolderSimpleLockOutline
                            width={32}
                            height={32}
                          />
                        </div>
                        <div className={styles.privacyInfo}>
                          <p>{item?.ruName}ый</p>
                          <div className={styles.additionalInfo}>
                            <p>{item?.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div
                  onClick={() => setPrivacyModalSelector((prev) => !prev)}
                  className={styles.privacyCard}
                >
                  <div className={styles.iconContainer}>
                    <Icon24FolderSimpleLockOutline width={32} height={32} />
                  </div>
                  <div className={styles.privacyInfo}>
                    <p>{currentPrivacy?.ruName}ый</p>
                    <div className={styles.additionalInfo}>
                      <p>{currentPrivacy?.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit">Подтвердить</button>
            </form>
          </div>
        </ModalContainer>
      )}
    </AnimatePresence>
  );
};
