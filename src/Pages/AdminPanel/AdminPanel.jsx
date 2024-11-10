import React, { useEffect } from "react";
import { useGetPendingUsers } from "../../hooks/useGetPendingUsers";
import { useApproveUser } from "../../hooks/useApproveUser";

function AdminPanel() {
  const { pendingUsers, getPendingUsers } = useGetPendingUsers();
  const { approveUser } = useApproveUser();
  useEffect(() => {
    getPendingUsers();
  }, []);

  return (
    <div>
      {pendingUsers &&
        pendingUsers.map((user) => (
          <div>
            <p>{user.login}</p>
            <p>{user.role}</p>
            <p>{user.status}</p>
            <button onClick={() => approveUser(user.id)}>Подтвердить</button>
          </div>
        ))}
    </div>
  );
}

export default AdminPanel;
