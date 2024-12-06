import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SearchMobile } from "../SearchMobile/SearchMobile";
import { AddMenuMobile } from "../AddMenuMobile/AddMenuMobile";
import { UserMenuMobile } from "../UserMenuMobile/UserMenuMobile";
import styles from "./BottomMenu.module.scss";
import {
  Icon24MenuOutline,
  Icon24SearchOutline,
  Icon24HomeOutline,
  Icon24FolderOutline,
  Icon24Add,
} from "@vkontakte/icons";
import { Logo } from "../Svg/logo";
import { UserLogo } from "../UserLogo/UserLogo";
import { MobileMenu } from "../MobileMenu/MobileMenu";

import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../store/slices/menu";

export const BottomMenu = ({
  id,
  addButtons,
  openMobileMenu,
  setOpenMobileMenu,
}) => {
  const [mobileChildren, setMobileChildren] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData.userData);

  const arrButtons = useMemo(
    () => [
      {
        id: 2,
        name: "Папки",
        icon: <Icon24FolderOutline />,
        event: () => dispatch(setOpen(true)),
      },
      {
        id: 4,
        name: "Поиск",
        icon: <Icon24SearchOutline />,
        event: () => {
          setMobileChildren(<SearchMobile id={id} />);
          setOpenMobileMenu(true);
        },
      },
      {
        id: 1,
        icon: <Logo width={40} height={40} />,
        event: () => navigate("/"),
      },
      {
        id: 3,
        name: "Создать",
        icon: <Icon24Add />,
        event: () => {
          setMobileChildren(
            <AddMenuMobile
              addButtons={addButtons}
              setOpenMobileMenu={setOpenMobileMenu}
            />
          );
          setOpenMobileMenu(true);
        },
      },
      {
        id: 5,
        icon: <UserLogo userData={user} width={37} height={37} />,
        event: () => {
          setMobileChildren(<UserMenuMobile user={user} />);
          setOpenMobileMenu(true);
        },
      },
    ],
    [addButtons, dispatch, id, navigate, setOpenMobileMenu, user]
  );

  const mobileMenuContent = useMemo(
    () =>
      mobileChildren && (
        <MobileMenu open={openMobileMenu} setOpen={setOpenMobileMenu}>
          {mobileChildren}
        </MobileMenu>
      ),
    [mobileChildren, openMobileMenu, setOpenMobileMenu]
  );

  return (
    <div className={styles.container}>
      {mobileMenuContent}
      <div className={styles.buttonsList}>
        {arrButtons.map((button) => (
          <button key={button.id} onClick={button.event}>
            {button.icon}
            <label>{button.name}</label>
          </button>
        ))}
      </div>
    </div>
  );
};
