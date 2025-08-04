import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header" onClick={() => navigate("/")}>
        ProFind
      </div>

      <div className="sidebar-menu">
        <div className="sidebar-item" onClick={() => navigate("/dashboard")}>
          Dashboard
        </div>

        <div className="sidebar-item" onClick={() => navigate("/home")}>
          Search
        </div>

        <div className="sidebar-item" onClick={() => navigate("/profile")}>
          Profile
        </div>

        <div className="sidebar-item" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
}
