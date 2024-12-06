import React, { useEffect } from "react";
import styles from "./LocationSelector.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import {
  Icon24Globe,
  Icon24FolderOutline,
  Icon24ChevronDownSmall,
} from "@vkontakte/icons";

export const LocationSelector = ({
  locationSelector,
  locationContainerRef,
  searchValue,
  setSearchValue,
  setLocationSelector,
}) => {
  const locations = [
    {
      id: 1,
      location: "local",
      name: "Локальный",
      description: "Поиск по открытой папке",
      icon: <Icon24FolderOutline width={20} />,
    },
    {
      id: 2,
      location: "global",
      name: "Глобальный",
      description: "Поиск по всем доступным папкам",
      icon: <Icon24Globe width={20} />,
    },
  ];

  const currentLocation = locations.find(
    (l) => l.location === searchValue.location
  );

  const onClose = () => {
    setLocationSelector(false);
  };

  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLocationSelector((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      locationContainerRef.current &&
      !locationContainerRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={locationContainerRef} className={styles.locationSelector}>
      <AnimatePresence>
        {locationSelector && (
          <motion.div
            className={styles.selectorContainer}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => {
                  setSearchValue({
                    ...searchValue,
                    location: location.location,
                  });
                  setLocationSelector(false);
                }}
                style={{
                  backgroundColor:
                    currentLocation.location === location.location
                      ? "rgb(50, 50, 50)"
                      : "transparent",
                }}
              >
                <div className={styles.iconContainer}>{location.icon}</div>

                <div className={styles.locationInfo}>
                  <p>{location.name}</p>
                  <p className={styles.description}>{location.description}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={toggleMenu}>
        {currentLocation.icon}
        <Icon24ChevronDownSmall width={18} />
      </button>
    </div>
  );
};
