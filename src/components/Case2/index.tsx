import React from "react";
import useCase2 from "./useCase2";

const Case2: React.FC = () => {
  const { canvas } = useCase2();

  return (
    <div>
      <canvas ref={canvas} id="case2" />
    </div>
  );
};

export default Case2;
