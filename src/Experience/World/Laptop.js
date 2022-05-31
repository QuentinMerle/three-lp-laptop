import * as THREE from "three";
import gsap from "gsap";
import Experience from "../Experience.js";
import portalVertexShader from "../../Shaders/Portal/vertex.glsl";
import portalFragmentShader from "../../Shaders/Portal/fragment.glsl";

export default class Laptop {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.objectsDistance = this.experience.objectsDistance;
    /* TEST */
    this.currentColor = this.experience.currentColor;
    this.currentSection = this.experience.currentSection;
    this.scroll = this.experience.scroll;
    this.sizes = this.experience.sizes;
    this.currentColor = this.experience.currentColor;
    this.clock = new THREE.Clock();
    /* END TEST */
    this.debug = this.experience.debug;

    /* SHADERS */
    this.screenLightMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorStart: { value: new THREE.Color("#fb7185") },
        uColorEnd: { value: new THREE.Color("#d946ef") },
      },
      vertexShader: portalVertexShader,
      fragmentShader: portalFragmentShader,
    });

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("laptop");
    }

    // Setup
    this.resource = this.resources.items.laptopModel;
    console.log(this.resource.scene.children[0]);
    this.top = this.resource.scene.children[0].children.find(
      (child) => child.name === "Top"
    );
    this.macBook = this.resource.scene.children.find(
      (child) => child.name === "Macbook"
    );
    this.frontCamera = this.resource.scene.children[0].children.find(
      (child) => child.name === "FrontCameraRing001"
    );
    this.screen = this.resource.scene.children[0].children[13].children.find(
      (child) => child.name === "Circle002_4"
    );
    this.keyboard = this.resource.scene.children[0].children[12].children.find(
      (child) => child.name === "Circle_1"
    );
    this.setModel();

    /* CUSTOM SCREEN */
    this.geometry = new THREE.PlaneGeometry(5, 3.1, 32, 32);
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.plane.material = this.screenLightMaterial;
    this.plane.position.x = 0;
    this.plane.position.y = -0.05;
    this.plane.position.z = -1.9;
    this.plane.rotation.x = -Math.PI * 0.5;
    this.top.add(this.plane);
  }

  update() {
    const elapsedTime = this.clock.getElapsedTime();
    let color = new THREE.Color(`#${this.currentColor.currentColor}`);
    this.screenLightMaterial.uniforms.uTime.value = elapsedTime;
    this.model = this.resource.scene;
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // child.castShadow = true;
        if (
          child !== this.screen &&
          child !== this.keyboard &&
          child !== this.plane
        ) {
          // console.log(color.r);
          // child.material.color.setStyle(`#${this.currentColor.currentColor}`);
          gsap.to(child.material.color, {
            duration: 0.5,
            // set: color,
            r: color.r,
            g: color.g,
            b: color.b,
            ease: "Sine.easeOut",
          });
        }
      }
    });
    this.animate();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.position.y = -this.objectsDistance * 0.25;
    this.model.position.x = 0;

    this.top.rotation.x = "3.14";
    this.frontCamera.material.opacity = 0;
    // this.screen.material = this.screenLightMaterial;
    // console.log(this.screen);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.material.transparent = true;
      }
    });

    this.scene.add(this.model);
  }

  animate() {
    const newSection = Math.round(this.scroll.y / this.sizes.height);

    if (newSection != this.currentSection) {
      this.currentSection = newSection;

      if (newSection === 3) {
        this.screenLightMaterial.uniforms.uColorStart.value.set("#d946ef");
        this.screenLightMaterial.uniforms.uColorEnd.value.set("#6366f1");
      } else {
        this.screenLightMaterial.uniforms.uColorStart.value.set("#fb7185");
        this.screenLightMaterial.uniforms.uColorEnd.value.set("#d946ef");
      }

      if (this.top) {
        switch (newSection) {
          case 1:
            gsap.to(this.top.rotation, {
              duration: 0.5,
              ease: "Sine.easeOut",
              x: "1.3",
            });
            break;
          case 2:
            gsap.to(this.top.rotation, {
              duration: 0.5,
              ease: "Sine.easeOut",
              x: "2",
            });
            break;
          case 3:
            gsap.to(this.top.rotation, {
              duration: 0.5,
              ease: "Sine.easeOut",
              x: "1",
            });
            break;
          default:
            gsap.to(this.top.rotation, {
              duration: 0.5,
              ease: "Sine.easeOut",
              x: "3.14",
            });
        }
      }

      if (this.macBook) {
        switch (newSection) {
          case 0:
            gsap.to(this.macBook.rotation, {
              duration: 0.5,
              ease: "SlowMo",
              y: "0",
            });
            break;
          case 1:
            gsap.to(this.macBook.rotation, {
              duration: 1,
              ease: "SlowMo",
              y: "0",
            });
            break;
          case 2:
            gsap.to(this.macBook.rotation, {
              duration: 1,
              ease: "SlowMo",
              y: "3.14",
            });
            break;
          case 3:
            gsap.to(this.macBook.rotation, {
              duration: 1,
              ease: "SlowMo",
              y: "5.5",
            });
            break;
          default:
            gsap.to(this.macBook.rotation, {
              duration: 1,
              ease: "SlowMo",
              y: "0",
            });
        }
      }
    }
  }
}
