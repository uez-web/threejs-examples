import React from "react";
import useCase3 from "./useCase3";
import "./case3.css";

const Case3: React.FC = () => {
  const { canvas } = useCase3();
  return (
    <div>
      <canvas ref={canvas} id="case3" />
    </div>
  );
};

export default Case3;
