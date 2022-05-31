import * as THREE from "three";
import gsap from "gsap";
import Experience from "../Experience.js";

const parameters = {
  materialColor: "#ffffff",
};

export default class Cube {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    // TEST
    this.sizes = this.experience.sizes;
    this.objectsDistance = this.experience.objectsDistance;
    this.currentSection = this.experience.currentSection;
    this.scroll = this.experience.scroll;
    this.currentColor = this.experience.currentColor;
    // END TEST
    this.textureLoader = new THREE.TextureLoader();
    this.gradientTexture = this.textureLoader.load("textures/gradients/3.jpg");
    this.gradientTexture.magFilter = THREE.NearestFilter;

    // Material
    this.material = new THREE.MeshToonMaterial({
      color: parameters.materialColor,
      gradientMap: this.gradientTexture,
    });

    // Test mesh
    const cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), this.material);
    cube.position.y = -this.objectsDistance * 0;
    cube.position.x = 0;

    this.resource = cube;

    this.scene.add(cube);
  }

  update() {
    this.resource.material.color.setHex(`0x${this.currentColor.currentColor}`);
    this.animate();
  }

  animate() {
    const newSection = Math.round(this.scroll.y / this.sizes.height);
    if (newSection != this.currentSection) {
      this.currentSection = newSection;

      if (this.currentSection !== 0) {
        gsap.to(this.resource.rotation, {
          duration: 1.5,
          ease: "power2.inOut",
          x: "+=6",
          y: "+=3",
          z: "+=1.5",
        });
      }

      switch (this.currentSection) {
        case 1:
          gsap.to(this.resource.position, {
            duration: 1,
            ease: "power2.inOut",
            x: "-2",
            z: "3",
          });
          break;
        case 2:
          gsap.to(this.resource.position, {
            duration: 1,
            ease: "power2.inOut",
            x: "1.5",
            z: "2",
          });
          break;
        case 3:
          gsap.to(this.resource.position, {
            duration: 1,
            ease: "power2.inOut",
            x: "-2.5",
            z: "1",
          });
          break;
        default:
          gsap.to(this.resource.rotation, {
            duration: 1,
            ease: "power2.inOut",
            x: "0",
            y: "0",
            z: "0",
          });
          gsap.to(this.resource.position, {
            duration: 1,
            ease: "power2.inOut",
            x: "0",
            z: "0",
          });
      }

      // console.log(this.currentSection);
    }

    if (this.currentSection !== 0) {
      this.resource.rotation.x += this.time.delta * 0.00005;
      this.resource.rotation.y += this.time.delta * 0.00003;
    }
  }
}
