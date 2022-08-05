import * as THREE from "three";

export let renderer: any;

export const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export const scene: any = new THREE.Scene();

export const camera: any = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

export const createRenderer: any = (
  canvas: HTMLCanvasElement,
  config: object = {} as any
) => {
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    ...config,
  });
  return renderer;
};

export const onWindowResize = () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};
