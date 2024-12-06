import React, { useRef, useState, useEffect } from "react";
import { ModalContainer } from "../ModalContainer/ModalContainer";
import styles from "./SearchModal.module.scss";
import { Icon28Cancel } from "@vkontakte/icons";
import { useSearch } from "../../hooks/useSearch";
import { FileSearchContainer } from "../FileSearchContainer/FileSearchContainer";

import { LocationSelector } from "../LocationSelector/LocationSelector";

export const SearchModal = ({ id, searchModal, setSearchModal }) => {
  const [searchValue, setSearchValue] = useState({
    value: "",
    location: "local",
  });
  const [locationSelector, setLocationSelector] = useState(false);
  const inputRef = useRef(null);
  const locationContainerRef = useRef(null);
  const { filesList, getSearchFiles } = useSearch();

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
          <LocationSelector
            locationSelector={locationSelector}
            setLocationSelector={setLocationSelector}
            locationContainerRef={locationContainerRef}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
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
