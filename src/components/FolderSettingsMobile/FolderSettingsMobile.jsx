import React, { useState, useMemo, useCallback } from "react";
import styles from "./FolderSettingsMobile.module.scss";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { useEditFolder } from "../../hooks/useEditFolder";
import { AnimatePresence } from "framer-motion";

export const FolderSettingsMobile = ({ folder, open, setOpen }) => {
  const [editFolderData, setEditFolderData] = useState({
    name: folder.name || "",
    privacy: folder.privacy,
  });

  const { editFolder } = useEditFolder();

  const privacyOptions = useMemo(
    () => [
      {
        id: 1,
        name: "Public",
        ruName: "Публичный",
        description:
          "Открывает доступ для всех пользователей. Редактирование имени и уровня доступа может осуществлять только создатель папки, а так же администрация.",
      },
      {
        id: 2,
        name: "Private",
        ruName: "Приватный",
        description: "Доступ предоставляется исключительно создателю папки.",
      },
    ],
    []
  );

  const handleInputChange = useCallback(
    (e) => setEditFolderData((prev) => ({ ...prev, name: e.target.value })),
    []
  );

  const handlePrivacyChange = useCallback(
    (privacyName) =>
      setEditFolderData((prev) => ({ ...prev, privacy: privacyName })),
    []
  );

  const closeMenu = useCallback(() => setOpen(false), [setOpen]);

  const submitEditFolder = useCallback(
    (e) => {
      e.preventDefault();
      editFolder(folder.id, editFolderData);
    },
    [editFolder, folder.id, editFolderData]
  );
  console.log("rerender");

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {open && (
          <MobileMenu open={open} setOpen={setOpen}>
            <form onSubmit={submitEditFolder} className={styles.editFolder}>
              <div className={styles.inputContainer}>
                <input
                  value={editFolderData.name}
                  onChange={handleInputChange}
                  placeholder="Название папки"
                />
              </div>
              <div className={styles.privacySelector}>
                {privacyOptions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handlePrivacyChange(item.name)}
                    style={{
                      backgroundColor:
                        editFolderData.privacy === item.name
                          ? "rgba(128, 128, 128, 0.267)"
                          : "transparent",
                    }}
                    className={styles.privacyOption}
                  >
                    {item.ruName}
                  </div>
                ))}
              </div>
              <button type="submit" className={styles.submitButton}>
                Подтвердить
              </button>
            </form>
          </MobileMenu>
        )}
      </AnimatePresence>
    </div>
  );
};
