import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Skeleton from "../../util/skeleton";
import vertexShader from "./shader/vertexShader.glsl";
import fragmentShader from "./shader/fragmentShader.glsl";

const useCase3 = () => {
  const container = useRef<HTMLDivElement>(null);

  const init = () => {
    const webgl = new Skeleton({
      container: container.current,
      config: { alpha: true, antialias: true },
    });
    webgl.setRenderer();
    new OrbitControls(webgl.camera, webgl.renderer.domElement);

    const model = new THREE.SphereBufferGeometry(20, 64, 64);
    const { array } = model.attributes.position;
    let vertices: any[] = [];
    for (let i = 3; i < array.length; i += 3) {
      const z = array[i];
      const y = array[i - 1];
      const x = array[i - 2];
      vertices.push(x, y, z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    const material = new THREE.ShaderMaterial({
      alphaTest: 1,
      uniforms: {
        time: {
          value: 0,
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
    const points = new THREE.Points(geometry, material);

    webgl.scene.add(points);
    webgl.camera.position.set(0, 0, 50);
    webgl.render(() => {});

    window.addEventListener("resize", webgl.onWindowResize.bind(webgl));
  };

  useEffect(() => {
    init();
  }, []);

  return {
    container,
  };
};

export default useCase3;
