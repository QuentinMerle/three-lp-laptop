import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Experience from "./Experience.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.cursor = this.experience.cursor;
    /* TEST */
    this.currentSection = this.experience.currentSection;
    this.scroll = this.experience.scroll;
    this.sizes = this.experience.sizes;
    /* END TEST */
    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("camera");
    }

    this.setInstance();

    // this.setOrbitControls();
    // this.animate();
  }

  setInstance() {
    // this.cameraGroup = new THREE.Group();
    // this.scene.add(this.cameraGroup);
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(0, 1, 8);
    this.scene.add(this.instance);
  }

  // setOrbitControls() {
  //   this.controls = new OrbitControls(this.instance, this.canvas);
  //   this.controls.enableDamping = true;
  // }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.animate();
    // this.controls.update();
  }

  animate() {
    // Animate Camera Parallax
    // this.instance.position.x = this.cursor.x;
    // this.instance.position.y = -this.cursor.y;

    const newSection = Math.round(this.scroll.y / this.sizes.height);
    if (newSection != this.currentSection) {
      this.currentSection = newSection;

      switch (this.currentSection) {
        case 1:
          gsap.to(this.instance.position, {
            duration: 1,
            ease: "power2.inOut",
            x: "-1",
            y: "0.5",
            z: "4",
          });
          break;
        case 2:
          gsap.to(this.instance.position, {
            duration: 1,
            ease: "power2.inOut",
            x: "1.5",
            y: "0.5",
            z: "7",
          });
          break;
        case 3:
          gsap.to(this.instance.position, {
            duration: 1,
            ease: "power2.inOut",
            x: "-0.4",
            y: "0.4",
            z: "6",
          });
          break;
        default:
          gsap.to(this.instance.position, {
            duration: 1,
            ease: "power2.inOut",
            x: "0",
            y: "1",
            z: "8",
          });
      }
    }
  }
}
