import React, { useEffect, useState } from "react";
import { api } from "../api";
import PostCard from "../components/PostCard";

export default function Profile({ user, setUser }) {
  const [data, setData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);
  async function fetchProfile() {
    try {
      const res = await api("/users/me");
      setData(res);
      setName(res.user.name);
      setBio(res.user.bio || "");
    } catch (err) {
      console.error(err);
    }
  }

  async function save() {
    try {
      const res = await api("/users", {
        method: "PUT",
        body: JSON.stringify({ name, bio }),
      });
      setUser(res);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  }

  if (!user) return <div>Please login to see profile.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="profile">
      <div className="profile-card">
        {!editing ? (
          <>
            <h2>{data.user.name}</h2>
            <p>{data.user.bio || "No bio yet"}</p>
            <button onClick={() => setEditing(true)}>Edit</button>
          </>
        ) : (
          <>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
            <button onClick={save}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        )}
      </div>

      <div className="profile-posts">
        <h3>Your posts</h3>
        {data.posts.map((p) => (
          <PostCard key={p._id} p={p} />
        ))}
      </div>
    </div>
  );
}
