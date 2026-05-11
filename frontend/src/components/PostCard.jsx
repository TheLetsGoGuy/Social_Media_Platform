import React from "react";

export default function PostCard({ p }) {
  return (
    <article className="postcard">
      <div className="meta">
        <div className="avatar">{p.userName?.[0]}</div>
        <div>
          <div className="name">{p.userName}</div>
          <div className="time">{new Date(p.createdAt).toLocaleString()}</div>
        </div>
      </div>
      <div className="content">
        {p.text && <p>{p.text}</p>}
        {p.imageUrl && (
          <img
            src={`${
              import.meta.env.VITE_API_BASE?.replace("/api", "") ||
              "https://social-media-platform-c8i8.vercel.app"
            }${p.imageUrl}`}
            alt="post"
          />
        )}
      </div>
    </article>
  );
}
