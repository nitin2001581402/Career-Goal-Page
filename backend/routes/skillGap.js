import express from 'express';
const router = express.Router();

const ROLE_SKILLS = {
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "Git"],
  "Backend Developer": ["Java", "Spring Boot", "SQL", "APIs", "Git"],
  "Data Analyst": ["Excel", "SQL", "Python", "Dashboards", "Statistics"]
};

const normalize = (s) => String(s).trim();

router.post('/', (req, res) => {
  try {
    const { targetRole, currentSkills } = req.body;
    if (!targetRole) return res.status(400).json({ error: 'targetRole is required' });

    const roleKey = Object.keys(ROLE_SKILLS).find(r => r.toLowerCase() === targetRole.toLowerCase());
    if (!roleKey) return res.status(400).json({ error: 'Unknown target role.' });

    const required = ROLE_SKILLS[roleKey].map(normalize);
    const provided = (currentSkills || []).map(normalize);

    const matched = required.filter(s => provided.some(p => p.toLowerCase() === s.toLowerCase()));
    const missing = required.filter(s => !matched.includes(s));

    const recommendations = missing.map(s => ({
      skill: s,
      reason: `Learn basics and do a small project using ${s}.`
    }));

    const suggestedOrder = [
      ...missing.filter(s => /HTML|CSS|JavaScript|Java|Python|SQL/i.test(s)),
      ...missing.filter(s => !/HTML|CSS|JavaScript|Java|Python|SQL/i.test(s))
    ];

    res.json({
      targetRole: roleKey,
      matchedSkills: matched,
      missingSkills: missing,
      recommendations,
      suggestedOrder
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
