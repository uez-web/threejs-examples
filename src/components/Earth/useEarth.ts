import { useEffect, useRef } from "react";
import * as THREE from "three";
import * as dat from "dat.gui";
import useMouse from "../../hooks/useMouse";
import useWindowResize from "../../hooks/useWindowResize";
import {
  scene,
  camera,
  renderer,
  sizes,
  createRenderer,
  onWindowResize,
} from "../../util/createThree";

// loading
const textureLoader = new THREE.TextureLoader();
// Get the normal map here https://www.filterforge.com/filters/1519-normal.html
const earthNormalTexture = textureLoader.load("/static/EarthNormalMap.jpg");
// Debug
// const gui = new dat.GUI();
// Objects
const geometry = new THREE.SphereGeometry(0.7, 64, 64);
// Materials
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = earthNormalTexture;
material.color = new THREE.Color(0x292929);
// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
/**
 * Light 1
 */
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

/***** Debug ****/
// const light1 = gui.addFolder("Light1");
//
// light1.add(pointLight.position, "x").min(-3).max(3).step(0.01);
// light1.add(pointLight.position, "y").min(-6).max(6).step(0.01);
// light1.add(pointLight.position, "z").min(-3).max(3).step(0.01);
// light1.add(pointLight, "intensity").min(0).max(10).step(0.01);
//
// const light1Color = {
//   color: 0xffffff,
// };
//
// light1.addColor(light1Color, "color").onChange(() => {
//   pointLight.color.set(light1Color.color);
// });

/**
 * Light 2
 */
const pointLight2 = new THREE.PointLight(0xff0000, 2);
pointLight2.position.set(-1.91, 1.39, -1.13);
pointLight2.intensity = 2;
scene.add(pointLight2);

/***** Debug ****/
// const light2 = gui.addFolder("Light2");
//
// light2.add(pointLight2.position, "x").min(-3).max(3).step(0.01);
// light2.add(pointLight2.position, "y").min(-6).max(6).step(0.01);
// light2.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
// light2.add(pointLight2, "intensity").min(0).max(10).step(0.01);
//
// const light2Color = {
//   color: 0xff0000,
// };
//
// light2.addColor(light2Color, "color").onChange(() => {
//   pointLight2.color.set(light2Color.color);
// });

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLightHelper2);

/**
 * Light 3
 */
const pointLight3 = new THREE.PointLight(0xd1ff, 2);
pointLight3.position.set(1.28, -1.86, -1.45);
pointLight3.intensity = 12;
scene.add(pointLight3);

/***** Debug ****/
// const light3 = gui.addFolder("Light3");
//
// light3.add(pointLight3.position, "x").min(-3).max(3).step(0.01);
// light3.add(pointLight3.position, "y").min(-6).max(6).step(0.01);
// light3.add(pointLight3.position, "z").min(-3).max(3).step(0.01);
// light3.add(pointLight3, "intensity").min(0).max(10).step(0.01);
//
// const light3Color = {
//   color: 0xff0000,
// };
//
// light3.addColor(light3Color, "color").onChange(() => {
//   pointLight3.color.set(light3Color.color);
// });

// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1);
// scene.add(pointLightHelper3);

// Camera
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

const clock = new THREE.Clock();

const useEarth: any = () => {
  const earthCanvas = useRef<any>(null);
  const mouseLocation = useMouse();

  const tick = () => {
    mouseLocation.current.targetX = mouseLocation.current.mouseX * 0.001;
    mouseLocation.current.targetY = mouseLocation.current.mouseY * 0.001;

    const elapsedTime = clock.getElapsedTime();
    // Update objects
    sphere.rotation.y = 0.5 * elapsedTime;
    sphere.rotation.y +=
      0.5 * (mouseLocation.current.targetX - sphere.rotation.y);
    sphere.rotation.x +=
      0.05 * (mouseLocation.current.targetY - sphere.rotation.x);
    sphere.position.z +=
      -0.05 * (mouseLocation.current.targetY - sphere.rotation.x);

    renderer.render(scene, camera);
    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  const onWindowScroll = () => {
    sphere.position.y = window.scrollY * 0.001;
  };

  useEffect(() => {
    createRenderer(earthCanvas.current, { alpha: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, []);

  useWindowResize(onWindowResize);

  useEffect(() => {
    document.addEventListener("scroll", onWindowScroll);
    return () => {
      document.removeEventListener("scroll", onWindowScroll);
    };
  }, []);

  useEffect(() => {
    tick();
  }, []);

  return {
    earthCanvas,
  };
};

export default useEarth;
