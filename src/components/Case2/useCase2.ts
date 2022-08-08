import { useEffect, useRef } from "react";
import dat from "dat.gui";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import useWindowResize from "../../hooks/useWindowResize";
import useFrame from "../../hooks/useFrame";
import useMouse from "../../hooks/useMouse";
import {
  scene,
  camera,
  renderer,
  createRenderer,
  sizes,
  onWindowResize,
} from "../../util/createThree";

const raycaster = new THREE.Raycaster();

const gui = new dat.GUI();
const world = {
  plane: {
    width: 400,
    height: 400,
    widthSegments: 50,
    heightSegments: 50,
  },
};
// Debug
gui.add(world.plane, "width", 1, 500).onChange(generatePlane);
gui.add(world.plane, "height", 1, 500).onChange(generatePlane);
gui.add(world.plane, "widthSegments", 1, 100).onChange(generatePlane);
gui.add(world.plane, "heightSegments", 1, 100).onChange(generatePlane);

function generatePlane() {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegments,
    world.plane.heightSegments
  );

  // vertices position randomization
  const { array } = planeMesh.geometry.attributes.position;
  const randomValues = [];
  for (let i = 0; i < array.length; i++) {
    if (i % 3 === 0) {
      const x = array[i];
      const y = array[i + 1];
      const z = array[i + 2];

      // @ts-ignore
      array[i] = x + (Math.random() - 0.5) * 3;
      // @ts-ignore
      array[i + 1] = y + (Math.random() - 0.5) * 3;
      // @ts-ignore
      array[i + 2] = z + (Math.random() - 0.5) * 3;
    }

    randomValues.push(Math.random() * Math.PI * 2);
  }

  // @ts-ignore
  planeMesh.geometry.attributes.position.randomValues = randomValues;
  // @ts-ignore
  planeMesh.geometry.attributes.position.originalPosition =
    planeMesh.geometry.attributes.position.array;

  const colors = [];
  for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
    colors.push(0, 0.19, 0.4);
  }

  planeMesh.geometry.setAttribute(
    "color",
    new THREE.BufferAttribute(new Float32Array(colors), 3)
  );
}

const planeGeometry = new THREE.PlaneGeometry(
  world.plane.width,
  world.plane.height,
  world.plane.widthSegments,
  world.plane.heightSegments
);

const planeMaterial = new THREE.MeshPhongMaterial({
  side: THREE.DoubleSide,
  // @ts-ignore
  flatShading: THREE.FlatShading,
  vertexColors: true,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);
generatePlane();

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, -1, 1);
scene.add(light);

const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 0, -1);
scene.add(backLight);

const useCase2 = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const mouseLocation = useMouse();
  const frame = useRef<number>(0);

  useEffect(() => {
    createRenderer(canvas.current, { alpha: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    new OrbitControls(camera, renderer.domElement);
    camera.position.z = 50;
  }, []);

  useFrame(() => {
    renderer.render(scene, camera);
    raycaster.setFromCamera(mouseLocation.current.pointer, camera);
    frame.current += 0.01;

    // @ts-ignore
    const { array, originalPosition, randomValues } =
      planeMesh.geometry.attributes.position;
    for (let i = 0; i < array.length; i += 3) {
      // x
      // @ts-ignore
      array[i] =
        originalPosition[i] + Math.cos(frame.current + randomValues[i]) * 0.01;

      // y
      // @ts-ignore
      array[i + 1] =
        originalPosition[i + 1] +
        Math.sin(frame.current + randomValues[i + 1]) * 0.001;
    }

    planeMesh.geometry.attributes.position.needsUpdate = true;

    const intersects: any[] = raycaster.intersectObject(planeMesh);
    if (intersects.length > 0) {
      const { color } = intersects[0].object.geometry.attributes;

      // vertices 1
      color.setX(intersects[0].face.a, 0.1);
      color.setY(intersects[0].face.a, 0.5);
      color.setZ(intersects[0].face.a, 1);

      // vertices 2
      color.setX(intersects[0].face.b, 0.1);
      color.setY(intersects[0].face.b, 0.5);
      color.setZ(intersects[0].face.b, 1);

      // vertices 3
      color.setX(intersects[0].face.c, 0.1);
      color.setY(intersects[0].face.c, 0.5);
      color.setZ(intersects[0].face.c, 1);

      intersects[0].object.geometry.attributes.color.needsUpdate = true;

      const initialColor = {
        r: 0,
        g: 0.19,
        b: 0.4,
      };

      const hoverColor = {
        r: 0.1,
        g: 0.5,
        b: 1,
      };

      gsap.to(hoverColor, {
        r: initialColor.r,
        g: initialColor.g,
        b: initialColor.b,
        duration: 1,
        onUpdate: () => {
          // vertices 1
          color.setX(intersects[0].face.a, hoverColor.r);
          color.setY(intersects[0].face.a, hoverColor.g);
          color.setZ(intersects[0].face.a, hoverColor.b);

          // vertices 2
          color.setX(intersects[0].face.b, hoverColor.r);
          color.setY(intersects[0].face.b, hoverColor.g);
          color.setZ(intersects[0].face.b, hoverColor.b);

          // vertices 3
          color.setX(intersects[0].face.c, hoverColor.r);
          color.setY(intersects[0].face.c, hoverColor.g);
          color.setZ(intersects[0].face.c, hoverColor.b);
          color.needsUpdate = true;
        },
      });
    }
  });

  useWindowResize(onWindowResize);

  return {
    canvas,
  };
};

export default useCase2;
