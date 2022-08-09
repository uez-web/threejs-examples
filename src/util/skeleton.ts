import * as THREE from "three";

interface SkeletonProps {
  canvas: HTMLCanvasElement | null;
  config?: object;
}

export default class Skeleton {
  private readonly canvas: HTMLCanvasElement;
  public sizes: { width: number; height: number };
  public scene: any;
  public camera: any;
  public renderer: any;

  constructor(props: SkeletonProps) {
    if (!props.canvas) {
      throw Error("props canvas is must set!");
    }
    this.canvas = props.canvas;
    this.sizes = {
      width: this.canvas.offsetWidth,
      height: this.canvas.offsetHeight,
    };

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      ...(props.config || {}),
    });
  }

  setSizes() {
    this.sizes.width = this.canvas.offsetWidth;
    this.sizes.height = this.canvas.offsetHeight;
  }

  setRenderer() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  setCamera() {
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
  }

  onWindowResize() {
    // Update sizes
    this.setSizes();
    // Update camera
    this.setCamera();
    // Update renderer
    this.setRenderer();
  }

  render(frame?: () => void) {
    this.renderer.render(this.scene, this.camera);
    frame && frame();
    window.requestAnimationFrame(this.render.bind(this, frame));
  }
}
