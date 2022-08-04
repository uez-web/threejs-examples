import { useEffect, useRef } from "react";

const useMouse = () => {
  const mouseLocation = useRef<any>({
    mouseX: 0,
    mouseY: 0,
    targetX: 0,
    targetY: 0,
    windowX: window.innerWidth / 2,
    windowY: window.innerHeight / 2,
  });

  const onDocumentMouseMove = (evt: any) => {
    mouseLocation.current.mouseX = evt.clientX - mouseLocation.current.windowX;
    mouseLocation.current.mouseY = evt.clientX - mouseLocation.current.windowY;
  };

  useEffect(() => {
    document.addEventListener("mousemove", onDocumentMouseMove);
    return () => {
      document.removeEventListener("mousemove", onDocumentMouseMove);
    };
  }, []);

  return mouseLocation;
};

export default useMouse;
