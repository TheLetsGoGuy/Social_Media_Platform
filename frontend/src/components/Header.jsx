import React from "react";
import { Link } from "react-router-dom";

export default function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="brand">
        <Link to="/">MiniSocial</Link>
      </div>
      <nav>
        {user ? (
          <>
            <Link to="/profile">{user.name}</Link>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
