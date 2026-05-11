import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Register({ setUser }) {
  const [name, setName] = useState("");
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
        }/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.msg || "Register failed");
      localStorage.setItem("token", json.token);
      setUser(json.user);
      nav("/");
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <form className="auth" onSubmit={submit}>
      <h2>Create account</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
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
      <button>Register</button>
      {err && <div className="error">{err}</div>}
    </form>
  );
}
