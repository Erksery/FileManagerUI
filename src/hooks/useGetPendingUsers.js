import axios from "axios";
import React, { useCallback, useState } from "react";

export const useGetPendingUsers = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const getPendingUsers = useCallback(async () => {
    try {
      const usersData = await axios.get("/api/admin/getPendingUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPendingUsers(usersData.data);
    } catch (err) {
      console.log("Error fetching files", err);
    }
  }, []);

  return { pendingUsers, getPendingUsers };
};
