import React, { useState } from "react";
import Image from "../Image/Image";
import styles from "./Viewer.module.scss";
import FileContainer from "../FileContainer/FileContainer";
import { Icon36Document } from "@vkontakte/icons";

function Viewer({ data, deleteFile, editFile, openFile, setOpenFile, index }) {
  const arrImageFormat = ["image/png", "image/jpeg", "image/webp"];
  if (arrImageFormat.includes(data.type)) {
    return (
      <FileContainer
        data={data}
        deleteFile={deleteFile}
        editFile={editFile}
        openFile={openFile}
        setOpenFile={setOpenFile}
        index={index}
      >
        <Image id={data.name} />
      </FileContainer>
    );
  }
  return (
    <FileContainer
      data={data}
      deleteFile={deleteFile}
      editFile={editFile}
      openFile={openFile}
      setOpenFile={setOpenFile}
      index={index}
    >
      <Icon36Document width={56} height={56} />
    </FileContainer>
  );
}

export default Viewer;
