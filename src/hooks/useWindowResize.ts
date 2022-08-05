import { useEffect } from "react";

const useWindowResize = (onWindowResize: (e: any) => void) => {
  useEffect(() => {
    window.addEventListener("resize", onWindowResize);
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return void 0;
};

export default useWindowResize;
