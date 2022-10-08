import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import vertex from "./glsl/default.vert";
// import fragment from "./glsl/default.frag";
// import fragment from "./glsl/animation_easing.frag";
import fragment from "./glsl/animation_sprite.frag";
// import fragment from "./glsl/color_dither.frag";
// import fragment from "./glsl/color_lut.frag";
// import fragment from "./glsl/filter_bilateralBlur2D.frag";
// import fragment from "./glsl/filter_boxBlur2D.frag";
// import fragment from "./glsl/filter_gaussianBlur2D.frag";
// import fragment from "./glsl/filter_noiseBlur2D.frag";
// import fragment from "./glsl/filter_radialBlur2D.frag";
// import fragment from "./glsl/filter_edge2D.frag";
// import fragment from "./glsl/filter_fibonacciBokeh.frag";
// import fragment from "./glsl/filter_kuwahara2D.frag";
// import fragment from "./glsl/filter_laplacian2D.frag";
// import fragment from "./glsl/filter_median2D.frag";
// import fragment from "./glsl/filter_sharpen2D.frag";
// import fragment from "./glsl/generative_random.frag";
// import fragment from "./glsl/generative_cnoise.frag";
// import fragment from "./glsl/generative_pnoise.frag";
// import fragment from "./glsl/generative_snoise.frag";
// import fragment from "./glsl/generative_voronoise.frag";
// import fragment from "./glsl/generative_curl.frag";
// import fragment from "./glsl/generative_noised.frag";
// import fragment from "./glsl/generative_fbm.frag";
// import fragment from "./glsl/generative_worley.frag";
// import fragment from "./glsl/generative_voronoi.frag";
// import fragment from "./glsl/sample_bracketing.frag";
// import fragment from "./glsl/sample_untile.frag";

export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene();

    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xeeeeee, 1);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      100
    );

    this.camera.position.set(0, 0, 2);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;

    this.addObjects();
    this.resize();
    this.render();
    this.setupResize();
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;

    this.material.uniforms.u_resolution.value.x = this.width;
    this.material.uniforms.u_resolution.value.y = this.height;

    const dist = this.camera.position.z;
    const height = 1;
    this.camera.fov = 2 * (180 / Math.PI) * Math.atan(height / (2 * dist));

    if (this.width / this.height > 1) {
      this.plane.scale.x = this.camera.aspect;
    } else {
      this.plane.scale.y = 1 / this.camera.aspect;
    }

    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    const loader = new THREE.TextureLoader();
    this.img_danny = loader.load("assets/danny.png");
    this.img_sprite = loader.load("assets/sprite_megaman.png");
    this.img_noise = loader.load("assets/noise_blue.png");
    this.img_lut = loader.load("assets/lut.png");

    this.img_rocks = loader.load("assets/rocks.png");
    this.img_rocks.wrapS = THREE.RepeatWrapping;
    this.img_rocks.wrapT = THREE.RepeatWrapping;
    this.img_rocks.repeat.set(4, 4);

    this.img_rock_moss = loader.load("assets/rock_moss.jpg");
    this.img_rock_moss.wrapS = THREE.RepeatWrapping;
    this.img_rock_moss.wrapT = THREE.RepeatWrapping;
    this.img_rock_moss.repeat.set(4, 4);

    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        u_tex0: { value: this.img_danny },
        u_spriteTex: { value: this.img_sprite },
        u_noiseTex: { value: this.img_noise },
        u_lutTex: { value: this.img_lut },
        u_rocksTex: { value: this.img_rocks },
        u_rockMossTex: { value: this.img_rock_moss },
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2() },
      },
      // wireframe: true,
      // transparent: true,
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.geometry = new THREE.PlaneGeometry(1, 1);

    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  render() {
    this.time += 0.05;
    this.material.uniforms.u_time.value = this.time;
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}

new Sketch({
  dom: document.getElementById("container"),
});
