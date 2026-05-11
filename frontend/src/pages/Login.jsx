import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr(null);
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE || "https://social-media-platform-c8i8.vercel.app/api"
        }/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.msg || "Login failed");
      localStorage.setItem("token", json.token);
      setUser(json.user);
      nav("/");
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <form className="auth" onSubmit={submit}>
      <h2>Login</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button>Login</button>
      {err && <div className="error">{err}</div>}
    </form>
  );
}
