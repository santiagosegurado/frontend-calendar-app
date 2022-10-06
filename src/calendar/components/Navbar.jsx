import React from "react";
import { useAuthStore } from "../../hooks";

export const Navbar = () => {
  const { startLogout, user } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt mr-2"></i>
        {user.name}
      </span>

      <button className="btn btn-outline-danger" onClick={startLogout}>
        <i className="fas fa-sign-out-alt mr-1"></i>
        <span>Salir</span>
      </button>
    </div>
  );
};
