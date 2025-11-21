import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import skillGapRouter from './routes/skillGap.js';
import roadmapRouter from './routes/roadmap.js';
import newsRouter from './routes/news.js';
import fs from 'fs-extra';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// Ensure data directory and users.json exists
const dataDir = path.join(process.cwd(), 'data');
fs.ensureDirSync(dataDir);

const usersFile = path.join(dataDir, 'users.json');
if (!fs.existsSync(usersFile)) {
  fs.writeJsonSync(usersFile, []);
}

// Routes
app.use('/api/skill-gap', skillGapRouter);
app.use('/api/roadmap', roadmapRouter);
app.use('/api/news', newsRouter);

app.post('/api/save-input', async (req, res) => {
  try {
    const users = await fs.readJson(usersFile);
    users.push({ ...req.body, createdAt: new Date().toISOString() });
    await fs.writeJson(usersFile, users, { spaces: 2 });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Backend running' });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
