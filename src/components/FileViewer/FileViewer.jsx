import React, { useEffect, useState } from "react";
import styles from "./FileViewer.module.scss";
import {
  Icon16ArrowLeftOutline,
  Icon16Add,
  Icon24Search,
  Icon24NewsfeedOutline,
} from "@vkontakte/icons";
import { useDispatch, useSelector } from "react-redux";
import { UserLogo } from "../UserLogo/UserLogo";
import { SearchModal } from "../SearchModal/SearchModal";
import { AnimatePresence } from "framer-motion";
import { UserMenu } from "../UserMenu/UserMenu";
import { setOpen } from "../../store/slices/menu";

function FileViewer({ id, children }) {
  const [searchModal, setSearchModal] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData.userData);
  const menu = useSelector((state) => state.menu.open);

  return (
    <div style={{ marginLeft: menu ? 305 : 0 }} className={styles.fileViewer}>
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
          {!menu && (
            <button
              onClick={() => dispatch(setOpen(!menu))}
              style={{ transform: "rotate(-90deg)" }}
            >
              <Icon24NewsfeedOutline width={20} />
            </button>
          )}
          <button>
            <Icon16Add width={16} />
          </button>

          <button onClick={() => setSearchModal(true)}>
            <Icon24Search width={20} />
          </button>
        </div>
        <div className={styles.userInfoContainer}>
          <AnimatePresence>{userMenu && <UserMenu />}</AnimatePresence>

          <button onClick={() => setUserMenu((prev) => !prev)}>
            {user && <UserLogo userData={user} />}
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

export default FileViewer;
