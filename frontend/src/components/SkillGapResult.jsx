import React from 'react';

export default function SkillGapResults({ data }) {
  if (!data) return <div style={{ color: '#666' }}>No analysis yet.</div>;

  return (
    <div>
      <p><strong>Target:</strong> {data.targetRole}</p>

      <div>
        <h4>Matched Skills</h4>
        {data.matchedSkills && data.matchedSkills.length ? (
          <ul>{data.matchedSkills.map((s, i) => <li key={i}>{s}</li>)}</ul>
        ) : <p style={{ color: '#666' }}>None matched.</p>}
      </div>

      <div>
        <h4>Missing Skills</h4>
        {data.missingSkills && data.missingSkills.length ? (
          <ul>{data.missingSkills.map((s, i) => <li key={i}>{s}</li>)}</ul>
        ) : <p style={{ color: '#666' }}>You're already covering required skills!</p>}
      </div>

      <div>
        <h4>Recommendations</h4>
        {data.recommendations && data.recommendations.length ? (
          <ol>
            {data.recommendations.map((r, i) => <li key={i}><strong>{r.skill}:</strong> {r.reason}</li>)}
          </ol>
        ) : <p style={{ color: '#666' }}>No recommendations.</p>}
      </div>

      <div>
        <h4>Suggested Learning Order</h4>
        <p>{data.suggestedOrder && data.suggestedOrder.length ? data.suggestedOrder.join(' → ') : '—'}</p>
      </div>
    </div>
  );
}
