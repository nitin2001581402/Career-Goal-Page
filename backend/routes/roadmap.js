import express from 'express';
const router = express.Router();

const ROADMAP_TEMPLATES = {
  "Backend Developer": [
    { level: 1, title: "Phase 1 (1–2 months)", items: ["Java basics", "OOP", "Git", "Data Structures basics"] },
    { level: 2, title: "Phase 2 (2 months)", items: ["Spring Boot", "SQL", "REST APIs", "Unit Testing"] },
    { level: 3, title: "Phase 3 (1–2 months)", items: ["Deployment (Docker)", "CI/CD basics", "Projects", "System design basics"] }
  ],
  "Frontend Developer": [
    { level: 1, title: "Phase 1 (1–2 months)", items: ["HTML & CSS basics", "JavaScript basics", "Git"] },
    { level: 2, title: "Phase 2 (2 months)", items: ["React", "State management", "Component design", "Integration with APIs"] },
    { level: 3, title: "Phase 3 (1–2 months)", items: ["Testing", "Performance Optimization", "Projects", "Deploy to Netlify/Vercel"] }
  ],
  "Data Analyst": [
    { level: 1, title: "Phase 1 (1–2 months)", items: ["Excel basics", "SQL basics", "Statistics fundamentals"] },
    { level: 2, title: "Phase 2 (2 months)", items: ["Python (pandas)", "Data cleaning", "Dashboards (PowerBI/Tableau)"] },
    { level: 3, title: "Phase 3 (1–2 months)", items: ["Projects", "Storytelling with data", "Advanced statistics"] }
  ]
};

router.post('/', (req, res) => {
  try {
    const { targetRole } = req.body;
    if (!targetRole) return res.status(400).json({ error: 'targetRole required' });

    const templateKey = Object.keys(ROADMAP_TEMPLATES).find(r => r.toLowerCase() === targetRole.toLowerCase());
    if (!templateKey) return res.status(400).json({ error: 'Unknown target role.' });

    res.json({
      targetRole: templateKey,
      roadmap: ROADMAP_TEMPLATES[templateKey]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
