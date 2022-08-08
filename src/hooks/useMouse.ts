import { useEffect, useRef } from "react";
import * as THREE from "three";

const useMouse = () => {
  const mouseLocation = useRef<any>({
    mouseX: 0,
    mouseY: 0,
    targetX: 0,
    targetY: 0,
    pointer: new THREE.Vector2(),
    windowX: window.innerWidth / 2,
    windowY: window.innerHeight / 2,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  });

  const onDocumentMouseMove = (evt: any) => {
    mouseLocation.current.mouseX = evt.clientX - mouseLocation.current.windowX;
    mouseLocation.current.mouseY = evt.clientX - mouseLocation.current.windowY;
  };

  const onPointerMove = (evt: any) => {
    mouseLocation.current.pointer.x =
      (evt.clientX / mouseLocation.current.innerWidth) * 2 - 1;
    mouseLocation.current.pointer.y =
      -(evt.clientY / mouseLocation.current.innerWidth) * 2 + 1;
  };

  useEffect(() => {
    document.addEventListener("mousemove", onDocumentMouseMove);
    return () => {
      document.removeEventListener("mousemove", onDocumentMouseMove);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return mouseLocation;
};

export default useMouse;
