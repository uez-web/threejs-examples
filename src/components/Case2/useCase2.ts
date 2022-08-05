import { useEffect, useRef } from "react";
import useWindowResize from "../../hooks/useWindowResize";
import {
  scene,
  camera,
  renderer,
  createRenderer,
  sizes,
  onWindowResize,
} from "../../util/createThree";

const useCase2 = () => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    createRenderer(canvas.current, { alpha: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, []);

  useWindowResize(onWindowResize);

  return {
    canvas,
  };
};

export default useCase2;
