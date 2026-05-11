const API_BASE = import.meta.env.VITE_API_BASE || `https://social-media-platform-tceg.onrender.com/api`;

export async function api(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = options.headers || {};
  if (!(options.body instanceof FormData))
    headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = "Bearer " + token;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    let json = null;
    try {
      json = JSON.parse(text);
    } catch (e) {}
    const err = json?.msg || text || res.statusText;
    throw new Error(err);
  }
  return await res.json();
}
