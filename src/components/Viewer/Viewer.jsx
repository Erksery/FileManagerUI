import React, { useState, memo } from "react";
import { Image } from "../Image/Image";
import styles from "./Viewer.module.scss";
import { FileContainer } from "../FileContainer/FileContainer";
import { Icon36Document } from "@vkontakte/icons";

export const Viewer = memo(
  ({ data, deleteFile, editFile, openFile, setOpenFile, index }) => {
    const arrImageFormat = ["image/png", "image/jpeg", "image/webp"];

    return (
      <FileContainer
        data={data}
        deleteFile={deleteFile}
        editFile={editFile}
        openFile={openFile}
        setOpenFile={setOpenFile}
        index={index}
      >
        {arrImageFormat.includes(data.type) ? (
          <Image id={data.name} />
        ) : (
          <Icon36Document width={56} height={56} />
        )}
      </FileContainer>
    );
  }
);
