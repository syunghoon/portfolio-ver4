import React from "react";
import MotionCanvas from "../components/home/MotionCanvas/MotionCanvas";
import MainProjectCard from "../components/home/MainProjectCard/MainProjectCard";
import mainProjectsData from "../data/mainProjects.json";
import "./Home.css";

function Home() {
  return (
    <section className="page-section home">
      <h1 className="home__title">Product Designer</h1>
      <div className="home__toolbar">
        <p className="home__toolbar-filter">테스트 이름</p>
      </div>
      
      <div className="home__content">
        <div className="home__canvas">
          <MotionCanvas />
        </div>
        
        <div className="home__projects">
          {mainProjectsData.map((project) => (
            <MainProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
