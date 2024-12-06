import React, { useEffect, useState } from "react";
import styles from "./FileModal.module.scss";
import { Image } from "../Image/Image";
import {
  Icon28Cancel,
  Icon28ChevronRightOutline,
  Icon28ChevronLeftOutline,
  Icon28DeleteOutlineAndroid,
  Icon28DownloadOutline,
} from "@vkontakte/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useStopScroll } from "../../hooks/useStopScroll";

function FileModal({ files, openFile, setOpenFile }) {
  const { stopScroll } = useStopScroll();
  const arrImageFormat = ["image/png", "image/jpeg", "image/webp"];

  const backFile = (e) => {
    e.stopPropagation();
    if (openFile != 1) {
      setOpenFile(openFile - 1);
    }
  };
  const forwardFile = (e) => {
    e.stopPropagation();
    if (files[openFile] != undefined || null) {
      setOpenFile(openFile + 1);
    }
  };

  const stopClose = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (openFile) {
      document.body.classList.add("block-scroll");
    } else {
      document.body.classList.remove("block-scroll");
    }

    return () => {
      document.body.classList.remove("block-scroll");
    };
  }, [openFile]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => setOpenFile(null)}
      className={styles.modalContainer}
    >
      <div className={styles.modalPanel}>
        <p>{files[openFile - 1].originalName}</p>
        <div className={styles.buttons}>
          <button onClick={stopClose}>
            <a
              href={`http://192.168.0.5:3005/image/${files[openFile - 1].name}`}
              download
            >
              <Icon28DownloadOutline width={20} />
            </a>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenFile(null);
            }}
          >
            <Icon28Cancel width={20} />
          </button>
        </div>
      </div>
      <div className={styles.imageData}>
        <button onClick={backFile} disabled={!files[openFile - 2]?.name}>
          <Icon28ChevronLeftOutline width={20} height={20} />
        </button>
        <div onClick={stopClose} className={styles.imageContainer}>
          {arrImageFormat.includes(files[openFile - 1].type) ? (
            <Image id={files[openFile - 1].name} blur={false} />
          ) : (
            <p>Файл</p>
          )}
        </div>

        <button onClick={forwardFile} disabled={!files[openFile]?.name}>
          <Icon28ChevronRightOutline width={24} height={24} />
        </button>
      </div>
      <div className={styles.mobilePagination}>
        <button onClick={backFile} disabled={!files[openFile - 2]?.name}>
          <Icon28ChevronLeftOutline width={24} height={24} />
        </button>
        <button onClick={forwardFile} disabled={!files[openFile]?.name}>
          <Icon28ChevronRightOutline width={24} height={24} />
        </button>
      </div>
    </motion.div>
  );
}

export default FileModal;
