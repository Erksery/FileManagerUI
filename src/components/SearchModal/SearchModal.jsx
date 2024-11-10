import React, { useRef, useState, useEffect } from "react";
import { ModalContainer } from "../ModalContainer/ModalContainer";
import styles from "./SearchModal.module.scss";
import {
  Icon28Cancel,
  Icon24Globe,
  Icon24FolderOutline,
  Icon24ChevronDownSmall,
} from "@vkontakte/icons";
import { useSearch } from "../../hooks/useSearch";
import { FileSearchContainer } from "../FileSearchContainer/FileSearchContainer";
import { motion, AnimatePresence } from "framer-motion";

export const SearchModal = ({ id, searchModal, setSearchModal }) => {
  const [searchValue, setSearchValue] = useState({
    value: "",
    location: "local",
  });
  const [locationSelector, setLocationSelector] = useState(false);
  const inputRef = useRef(null);
  const locationContainerRef = useRef(null);
  const { filesList, getSearchFiles } = useSearch();

  const locations = [
    {
      id: 1,
      location: "local",
      name: "Локальный",
      description: "Поиск по открытой папке",
      icon: <Icon24FolderOutline width={20} />,
    },
    {
      id: 2,
      location: "global",
      name: "Глобальный",
      description: "Поиск по всем доступным папкам",
      icon: <Icon24Globe width={20} />,
    },
  ];

  const close = () => setSearchModal(!searchModal);
  const focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue.value.trim()) {
        getSearchFiles(searchValue, id);
      }
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const currentLocation = locations.find(
    (l) => l.location === searchValue.location
  );

  const onClose = () => {
    setLocationSelector(false);
  };

  const handleClickOutside = (event) => {
    if (
      locationContainerRef.current &&
      !locationContainerRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ModalContainer close={close}>
      <div className={styles.container}>
        <div className={styles.modalHeader}>
          <button onClick={close}>
            <Icon28Cancel width={20} />
          </button>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.inputContainer} onClick={focusInput}>
            <p>Поиск</p>
            <input
              ref={inputRef}
              value={searchValue.value}
              onChange={(e) =>
                setSearchValue({ ...searchValue, value: e.target.value })
              }
              placeholder="Введите название файла"
            />
          </div>
          <div className={styles.locationSelector}>
            <AnimatePresence>
              {locationSelector && (
                <motion.div
                  ref={locationContainerRef}
                  className={styles.selectorContainer}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => {
                        setSearchValue({
                          ...searchValue,
                          location: location.location,
                        });
                        setLocationSelector(false);
                      }}
                      style={{
                        backgroundColor:
                          currentLocation.location === location.location
                            ? "rgb(50, 50, 50)"
                            : "transparent",
                      }}
                    >
                      <div className={styles.iconContainer}>
                        {location.icon}
                      </div>

                      <div className={styles.locationInfo}>
                        <p>{location.name}</p>
                        <p className={styles.description}>
                          {location.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <button onClick={() => setLocationSelector((prev) => !prev)}>
              {currentLocation.icon}
              <Icon24ChevronDownSmall width={18} />
            </button>
          </div>
        </div>

        <div className={styles.filesList}>
          {filesList &&
            filesList.map((file) => (
              <FileSearchContainer key={file.id} file={file} />
            ))}
        </div>
      </div>
    </ModalContainer>
  );
};
