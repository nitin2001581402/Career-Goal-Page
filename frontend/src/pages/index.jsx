import React, { useState } from 'react';
import axios from 'axios';

export default function Index() {
  const [targetRole, setTargetRole] = useState('Backend Developer');
  const [skills, setSkills] = useState('');
  const [skillGap, setSkillGap] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const backendUrl = 'http://localhost:4000';

  async function analyze() {
    setError('');
    setLoading(true);
    try {
      const currentSkills = skills.split(',').map(s => s.trim()).filter(Boolean);

      // Skill Gap
      const sgRes = await axios.post(`${backendUrl}/api/skill-gap`, {
        targetRole,
        currentSkills,
      });
      setSkillGap(sgRes.data);

      // Roadmap
      const rmRes = await axios.post(`${backendUrl}/api/roadmap`, { targetRole });
      setRoadmap(rmRes.data);

      // News
      const newsRes = await axios.get(`${backendUrl}/api/news`);
      setNews(newsRes.data.stories);
    } catch (e) {
      setError(e.response?.data?.error || e.message);
      setSkillGap(null);
      setRoadmap(null);
      setNews([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="layout">
      <h1 className="title">Skill Gap & Career Roadmap Analyzer</h1>

      <div className="form-box">
        <label>
          Target Role:
          <select value={targetRole} onChange={e => setTargetRole(e.target.value)}>
            <option>Backend Developer</option>
            <option>Frontend Developer</option>
            <option>Data Analyst</option>
          </select>
        </label>

        <label>
          Technologies:
          <input
            type="text"
            placeholder="Java, Git, SQL"
            value={skills}
            onChange={e => setSkills(e.target.value)}
          />
        </label>

        <button onClick={analyze} disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze My Career Path'}
        </button>

        {error && <p className="error">{error}</p>}
      </div>

      <div className="results">
        <div className="left">
          <div className="card">
            <h2>Skill Gap Results</h2>
            {skillGap ? (
              <>
                <p><strong>Target Role:</strong> {skillGap.targetRole}</p>
                <p><strong>Matched Skills:</strong> {skillGap.matchedSkills.join(', ') || 'None'}</p>
                <p><strong>Missing Skills:</strong> {skillGap.missingSkills.join(', ') || 'None'}</p>
                <h4>Recommendations:</h4>
                <ul>
                  {skillGap.recommendations.map(({ skill, reason }) => (
                    <li key={skill}><strong>{skill}:</strong> {reason}</li>
                  ))}
                </ul>
                <p><strong>Suggested Learning Order:</strong> {skillGap.suggestedOrder.join(' → ')}</p>
              </>
            ) : (
              <p>No data yet. Please analyze.</p>
            )}
          </div>
        </div>

        <div className="right">
          <div className="card">
            <h2>Career Roadmap</h2>
            {roadmap ? (
              roadmap.roadmap.map(phase => (
                <div key={phase.level}>
                  <h3>{phase.title}</h3>
                  <ul>
                    {phase.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No roadmap yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="latest-news">
        <h2>Latest Tech News (HackerNews)</h2>
        {news.length > 0 ? (
          <ul>
            {news.map(item => (
              <li key={item.id}>
                <a
                  href={item.url || `https://news.ycombinator.com/item?id=${item.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.title}
                </a>
                <div className="news-meta">
                  Score: {item.score} | By: {item.by} | {new Date(item.time * 1000).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No news loaded yet.</p>
        )}
      </div>
    </div>
  );
}
