import React from "react";
import useCase1 from "./useCase1";
import "./case1.css";

const Earth: React.FC = () => {
  const { earthCanvas } = useCase1();

  return (
    <div className="three-earth">
      <div className="container">
        <h1>three.js 3d earth</h1>
      </div>
      <canvas ref={earthCanvas} className="earth-canvas" />
    </div>
  );
};

export default Earth;
