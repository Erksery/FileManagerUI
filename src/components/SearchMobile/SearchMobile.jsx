import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearch } from "../../hooks/useSearch";
import styles from "./SearchMobile.module.scss";
import { LocationSelector } from "../LocationSelector/LocationSelector";
import { FileSearchContainer } from "../FileSearchContainer/FileSearchContainer";

export const SearchMobile = ({ id }) => {
  const [searchValue, setSearchValue] = useState({
    value: "",
    location: "local",
  });
  const [locationSelector, setLocationSelector] = useState(false);
  const inputRef = useRef(null);
  const locationContainerRef = useRef(null);
  const { filesList, getSearchFiles } = useSearch();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue.value.trim()) {
        getSearchFiles(searchValue, id);
      }
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  return (
    <div className={styles.container}>
      <div>
        <p>Поиск</p>
        <div className={styles.searchPanel}>
          <div className={styles.inputContainer}>
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
      </div>

      <div className={styles.filesList}>
        <AnimatePresence>
          {filesList.length > 0 ? (
            filesList.map((file) => (
              <FileSearchContainer key={file.id} file={file} />
            ))
          ) : (
            <div>
              <p>Введите название файла</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
