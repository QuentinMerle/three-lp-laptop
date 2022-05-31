import * as THREE from "three";
import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Cube from "./Cube.js";
import Laptop from "./Laptop.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.laptop = new Laptop();
      // this.cube = new Cube();
      this.environment = new Environment();
    });
  }

  update() {
    if (this.laptop) {
      this.laptop.update();
    }
    // if (this.cube) {
    //   this.cube.update();
    // }
  }
}
