import React, { useEffect } from "react";

export const useStopScroll = () => {
  const stopScroll = (open) => {
    if (open) {
      document.body.classList.add("block-scroll");
    } else {
      document.body.classList.remove("block-scroll");
    }

    return () => {
      document.body.classList.remove("block-scroll");
    };
  };
  const autoScroll = () => {
    document.body.classList.remove("block-scroll");
  };

  return {
    stopScroll,
    autoScroll,
  };
};
