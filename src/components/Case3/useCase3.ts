import { useEffect, useRef } from "react";
import * as THREE from "three";
import Skeleton from "../../util/skeleton";
import earthMap from "../../../static/EarthTextureMap.jpg";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const useCase3 = () => {
  const canvas = useRef<HTMLCanvasElement>(null);

  const init = () => {
    const webgl = new Skeleton({
      canvas: canvas.current,
      config: { alpha: true, antialias: true },
    });
    webgl.setRenderer();
    new OrbitControls(webgl.camera, webgl.renderer.domElement);
    const group = new THREE.Group();

    const model = new THREE.SphereBufferGeometry(20, 64, 64);
    const { array } = model.attributes.position;
    for (let i = 3; i < array.length; i += 3) {
      const z = array[i];
      const y = array[i - 1];
      const x = array[i - 2];
      const geometry = new THREE.SphereGeometry(0.5, 0.5, 1);
      const material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
      });
      const dot = new THREE.Mesh(geometry, material);
      dot.position.set(x, y, z);
      group.add(dot);
    }
    webgl.scene.add(group);
    console.log(group);
    webgl.camera.position.set(0, 0, 50);
    webgl.render(() => {
      group.rotation.y += 0.001;
    });

    window.addEventListener("resize", webgl.onWindowResize.bind(webgl));
  };

  useEffect(() => {
    init();
  }, []);

  return {
    canvas,
  };
};

export default useCase3;
