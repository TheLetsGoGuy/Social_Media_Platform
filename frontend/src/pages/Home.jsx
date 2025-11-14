import React, { useEffect, useState } from "react";
import Composer from "../components/Composer";
import PostCard from "../components/PostCard";
import { api } from "../api";

export default function Home({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    setLoading(true);
    try {
      const res = await api("/posts");
      setPosts(res);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div className="home">
      <Composer
        user={user}
        onPosted={(p) => setPosts((prev) => [p, ...prev])}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        posts.map((p) => <PostCard key={p._id} p={p} />)
      )}
    </div>
  );
}
