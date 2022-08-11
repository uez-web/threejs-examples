import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import Skeleton from "../../util/skeleton";
import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";

const useCase3 = () => {
  const container = useRef<HTMLDivElement>(null);

  const init = () => {
    const webgl = new Skeleton({
      container: container.current,
      config: {
        // alpha: true,
        // antialias: true
      },
    });
    webgl.setRenderer();
    new OrbitControls(webgl.camera, webgl.renderer.domElement);
    webgl.renderer.setClearColor(0xeeeeee, 1);

    const material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: true,
      },
      side: THREE.DoubleSide,
      uniforms: {
        timer: { value: 0 },
        resolution: {
          value: new THREE.Vector4(),
        },
        positionTexture: {
          value: null,
        },
      },
      // wireframe: true,
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    // const geometry = new THREE.BufferGeometry();
    // const positions = new Float32Array(WIDTH * WIDTH * 3);
    // const reference = new Float32Array(WIDTH * WIDTH * 2);
    //
    // for (let i = 0; i < WIDTH * WIDTH; i++) {
    //   const x = Math.random();
    //   const y = Math.random();
    //   const z = Math.random();
    //   const xx = (i % WIDTH) / WIDTH;
    //   const yy = ~~(i / WIDTH) / WIDTH;
    //   positions.set([x, y, z], i * 3);
    //   reference.set([xx, yy], i * 2);
    // }
    //
    // geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    // geometry.setAttribute("reference", new THREE.BufferAttribute(reference, 2));

    const femaleHeadUrl = new URL(
      "../../../static/femalehead.obj",
      import.meta.url
    ).href;

    new OBJLoader().load(femaleHeadUrl, (obj: any) => {
      const model = obj.children[0];
      const facePositions = model.geometry.attributes.position.array;
      const facePositionsNumber = Math.floor(facePositions.length / 3);

      let geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(facePositions.length * 3);
      const reference = new Float32Array(facePositions.length * 2);

      const len = Math.floor(Math.sqrt(facePositions.length));
      for (let i = 0; i < facePositionsNumber; i += 3) {
        const x = facePositions[i];
        const y = facePositions[i + 1];
        const z = facePositions[i + 2];
        const xx = (i % len) / len;
        const yy = ~~(i / len) / len;
        positions.set([x, y, z], i * 3);
        reference.set([xx, yy], i * 2);
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(facePositions, 3)
      );
      geometry.setAttribute(
        "reference",
        new THREE.BufferAttribute(reference, 2)
      );

      geometry = new THREE.IcosahedronBufferGeometry();

      const face = new THREE.Points(geometry, material);

      webgl.scene.add(face);
    });

    webgl.camera.position.set(0, 0, 7);
    let timer = 0;
    webgl.render(() => {
      timer += 0.05;
      material.uniforms.timer.value = timer;
    });

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
