import React from "react";
import useCase3 from "./useCase3";
import "./case3.css";

const Case3: React.FC = () => {
  const { container } = useCase3();
  return (
    <div>
      <div id="case3" ref={container} />
    </div>
  );
};

export default Case3;
