import React, { useEffect, useState } from "react";
import styles from "./FileViewer.module.scss";
import {
  Icon16ArrowLeftOutline,
  Icon16Add,
  Icon24Search,
} from "@vkontakte/icons";
import { useSelector } from "react-redux";
import { UserLogo } from "../UserLogo/UserLogo";
import { SearchModal } from "../SearchModal/SearchModal";
import { AnimatePresence } from "framer-motion";

function FileViewer({ id, children }) {
  const [searchModal, setSearchModal] = useState(false);
  const user = useSelector((state) => state.userData.userData);
  const menu = useSelector((state) => state.menu.open);

  return (
    <div style={{ marginLeft: menu ? 275 : 0 }} className={styles.fileViewer}>
      <AnimatePresence>
        {searchModal && (
          <SearchModal
            id={id}
            searchModal={searchModal}
            setSearchModal={setSearchModal}
          />
        )}
      </AnimatePresence>
      <div className={styles.fileHeader}>
        <div className={styles.toolsContainer}>
          <button>
            <Icon16Add width={16} />
          </button>

          <button onClick={() => setSearchModal(true)}>
            <Icon24Search width={20} />
          </button>
        </div>
        <div className={styles.userInfoContainer}>
          {user && <UserLogo userData={user} />}
        </div>
      </div>
      {children}
    </div>
  );
}

export default FileViewer;
