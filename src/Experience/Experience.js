import * as THREE from "three";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Resources from "./Utils/Resources.js";
import Color from "./Utils/Color.js";
import Debug from "./Utils/Debug.js";
import sources from "./sources.js";

const colors = document.querySelectorAll(".color");
let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;

    // Global access
    window.experience = this;

    // Options
    this.canvas = canvas;

    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    // TEST
    this.cursor = {};
    this.cursor.x = 0;
    this.cursor.y = 0;
    this.objectsDistance = 4;
    this.scroll = {};
    this.scroll.y = 0;
    this.currentColor = new Color(colors);
    // END TEST
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    // Sizes resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      this.update();
    });

    this.currentColor.on("click", () => {
      this.update();
    });

    window.addEventListener("mousemove", (event) => {
      this.cursor.x = event.clientX / this.sizes.width - 0.5;
      this.cursor.y = event.clientY / this.sizes.height - 0.5;
    });

    window.addEventListener("scroll", () => {
      this.scroll.y = window.scrollY;
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    // Traverse the whole scene
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        for (const key in child.material) {
          const value = child.material[key];

          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) {
      this.debug.ui.destroy();
    }
  }
}
