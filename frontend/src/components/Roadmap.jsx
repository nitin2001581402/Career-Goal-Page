import React from 'react';

export default function Roadmap({ data }) {
  if (!data) return <div style={{ color: '#666' }}>No roadmap yet.</div>;

  return (
    <div>
      <p><strong>Target:</strong> {data.targetRole}</p>
      {data.roadmap && data.roadmap.map(phase => (
        <div key={phase.level} style={{ marginBottom: 10 }}>
          <h4>{phase.title}</h4>
          <ul>
            {phase.items.map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
