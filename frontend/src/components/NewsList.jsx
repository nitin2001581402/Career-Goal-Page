import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export default function NewsList() {
  const [news, setNews] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await axios.get(`${API_BASE}/api/news`);
        setNews(data.stories || []);
      } catch (e) {
        console.error(e);
        setErr('Failed to load news');
      }
    }
    load();
  }, []);

  if (err) return <div style={{ color: '#666' }}>{err}</div>;
  if (!news) return <div style={{ color: '#666' }}>Loading news...</div>;
  if (!news.length) return <div style={{ color: '#666' }}>No stories found.</div>;

  return (
    <div>
      {news.map(item => (
        <div key={item.id} style={{ marginBottom: 10 }}>
          <a href={item.url || `https://news.ycombinator.com/item?id=${item.id}`} target="_blank" rel="noreferrer">{item.title}</a>
          <div style={{ fontSize: 12, color: '#666' }}>
            <span>Score: {item.score}</span> • <span>By: {item.by}</span> • <span>{new Date(item.time * 1000).toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
