import { useState } from "react";
import CareerForm from "./components/CareerForm";
import SkillGapResult from "./components/SkillGapResult";
import RoadmapResult from "./components/Roadmap";
import NewsSection from "./components/NewsList";
import "./components/Layout.css";

function App() {
  const [skillGap, setSkillGap] = useState(null);
  const [roadmap, setRoadmap] = useState(null);

  return (
    <div className="layout">
      <h1 className="title">Career Path Analyzer</h1>

      <CareerForm setSkillGap={setSkillGap} setRoadmap={setRoadmap} />

      <div className="results">
        <div className="left">
          {skillGap && <SkillGapResult data={skillGap} />}
        </div>
        <div className="right">
          {roadmap && <RoadmapResult data={roadmap} />}
        </div>
      </div>

      <NewsSection />
    </div>
  );
}

export default App;
