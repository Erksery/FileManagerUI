import axios from "axios";
import React, { useCallback } from "react";

export const useApproveUser = () => {
  const approveUser = useCallback(async (id) => {
    try {
      await axios.post(`/api/admin/approveUserRegistration/${id}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (err) {
      console.log("Ошибка при подтверждении пользователя");
    }
  }, []);
  return { approveUser };
};
