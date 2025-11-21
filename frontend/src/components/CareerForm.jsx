import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export default function CareerForm({ onResults, setLoading }) {
  const [targetRole, setTargetRole] = useState('Backend Developer');
  const [skillsText, setSkillsText] = useState('');
  const [msg, setMsg] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const provided = skillsText.split(',').map(s => s.trim()).filter(Boolean);
      const sg = await axios.post(`${API_BASE}/api/skill-gap`, { targetRole, currentSkills: provided }).then(r => r.data);
      const rm = await axios.post(`${API_BASE}/api/roadmap`, { targetRole }).then(r => r.data);
      // try save input (optional)
      try { await axios.post(`${API_BASE}/api/save-input`, { targetRole, currentSkills: provided }); } catch (_) {}
      onResults(sg, rm);
      setMsg({ type: 'success', text: 'Analysis complete' });
    } catch (err) {
      console.error(err);
      setMsg({ type: 'error', text: err?.response?.data?.error || err.message || 'Failed' });
      onResults(null, null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleAnalyze}>
      <label>Target Role
        <select value={targetRole} onChange={e => setTargetRole(e.target.value)}>
          <option>Backend Developer</option>
          <option>Frontend Developer</option>
          <option>Data Analyst</option>
        </select>
      </label>

      <label>Current Skills (comma separated)
        <input value={skillsText} onChange={e => setSkillsText(e.target.value)} placeholder="e.g. Java, Git, SQL" />
      </label>

      <button type="submit">Analyze My Career Path</button>

      {msg && <div style={{ marginTop: 8, color: msg.type === 'success' ? 'green' : 'red' }}>{msg.text}</div>}
    </form>
  );
}
