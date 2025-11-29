import React from "react";
import MotionCanvas from "../components/home/MotionCanvas/MotionCanvas";

function Home() {
  return (
    <section className="page-section">
      <h1>Product Designer</h1>
      <div className="content-toolbar">
        <p className="category-filter__button">테스트 이름</p>
      </div>
      <MotionCanvas />
    </section>
  );
}

export default Home;
