import { useState, useEffect } from "react";

export function useContextMenu() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [menuButtons, setMenuButtons] = useState([]);

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const openMenu = (e, buttons) => {
    e.preventDefault();
    setMenuVisible(true);
    setMenuPosition({ x: e.pageX, y: e.pageY });
    setMenuButtons(buttons);
  };

  useEffect(() => {
    const handleClickOutside = () => setMenuVisible(false);
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return {
    menuVisible,
    menuPosition,
    menuButtons,
    openMenu,
    setMenuVisible,
    closeMenu,
  };
}
