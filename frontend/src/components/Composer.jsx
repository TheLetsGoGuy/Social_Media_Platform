import React, { useState } from "react";
import { api } from "../api";

export default function Composer({ user, onPosted }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function submit(e) {
    e.preventDefault();
    if (!user) return setErr("Login to post");
    if (!text.trim() && !file) return setErr("Post must have text or image");
    setErr(null);
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("text", text);
      if (file) fd.append("image", file);
      const res = await api("/posts", { method: "POST", body: fd });
      setText("");
      setFile(null);
      onPosted && onPosted(res);
    } catch (err) {
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="composer" onSubmit={submit}>
      <textarea
        placeholder={user ? "What's happening?" : "Login to post"}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!user}
      />
      <div className="composer-actions">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <button disabled={!user || loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
      {err && <div className="error">{err}</div>}
    </form>
  );
}
