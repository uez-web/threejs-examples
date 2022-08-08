import { useEffect, useRef } from "react";

const useFrame = (frame: () => void) => {
  const frameId = useRef<number>(0);

  const animate = () => {
    frameId.current = requestAnimationFrame(animate);
    frame();
  };

  useEffect(() => {
    animate();

    return () => {
      cancelAnimationFrame(frameId.current);
    };
  }, []);
  return void 0;
};

export default useFrame;
