import React from "react";
import useEarth from "./useEarth";
import "./earth.css";

const Earth: React.FC = () => {
  const { earthCanvas } = useEarth();

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
