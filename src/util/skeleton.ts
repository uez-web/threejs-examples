import * as THREE from "three";

interface SkeletonProps {
  container: HTMLDivElement | null;
  config?: object;
}

export default class Skeleton {
  private readonly container: HTMLDivElement;
  public sizes: { width: number; height: number };
  public scene: any;
  public camera: any;
  public renderer: any;

  constructor(props: SkeletonProps) {
    if (!props.container) {
      throw Error("props container is must set!");
    }
    this.container = props.container;
    this.sizes = {
      width: this.container.offsetWidth,
      height: this.container.offsetHeight,
    };

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.renderer = new THREE.WebGLRenderer(props.config || {});
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild(this.renderer.domElement);
  }

  setSizes() {
    this.sizes.width = this.container.offsetWidth;
    this.sizes.height = this.container.offsetHeight;
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
