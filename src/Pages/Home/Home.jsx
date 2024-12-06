import axios from "axios";
import React, { useState, useEffect } from "react";
import { SideBar } from "../../components/SideBar/SideBar";
import styles from "./Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../store/slices/menu";
import { Logo } from "../../components/Svg/logo";
import { useMobile } from "../../hooks/useMobile";

function Home() {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.open);

  const { isMobile } = useMobile();

  return (
    <div className="container">
      <SideBar />
      <div style={{ marginLeft: menu ? 305 : 0 }} className={styles.container}>
        <div className={styles.homeContainer}>
          {isMobile ? (
            <>
              <div className={styles.nameContainer}>
                <Logo width={60} height={60} />
                <h3>ARTTECH PRODUCTION</h3>
              </div>

              <button onClick={() => dispatch(setOpen(true))}>
                Открыть список
              </button>
            </>
          ) : (
            <div>
              <p>Откройте папку для просмотра</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
