import axios from "axios";
import React, { useState, useEffect } from "react";
import { SideBar } from "../../components/SideBar/SideBar";
import styles from "./Home.module.scss";

function Home() {
  return (
    <div className="container">
      <SideBar />
      <div className={styles.container}>
        <div>
          <p>Тут можно просмотреть файлы в папках</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
