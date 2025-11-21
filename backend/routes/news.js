import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

const HN_BASE = 'https://hacker-news.firebaseio.com/v0';

router.get('/', async (req, res) => {
  try {
    const resp = await fetch(`${HN_BASE}/topstories.json`);
    const ids = await resp.json();
    const slice = ids.slice(0, 25);
    const detailsPromises = slice.map(id => fetch(`${HN_BASE}/item/${id}.json`).then(r => r.json()));
    const items = await Promise.all(detailsPromises);
    const stories = items.filter(i => i && i.type === 'story').slice(0, 5);

    const result = stories.map(s => ({
      id: s.id,
      title: s.title,
      url: s.url || null,
      score: s.score,
      time: s.time,
      type: s.type,
      by: s.by
    }));

    res.json({ count: result.length, stories: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch HackerNews stories' });
  }
});

export default router;
