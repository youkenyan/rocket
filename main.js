import './style/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 30;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
pointLight.intensity = 2;
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 1;
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 10, 10);
scene.add(directionalLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
const cameraHelper = new THREE.CameraHelper(camera);

//scene.add(cameraHelper);
//scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('./images/space12.png');

const moonTexture = new THREE.TextureLoader().load('./images/moonTextureMap.jpg');
const normalTexture = new THREE.TextureLoader().load('./images/MoonNormal.jpg');
const displacementTexture = new THREE.TextureLoader().load('./images/displacementMoonMap.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 64, 64),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
    displacementMap: displacementTexture,
    displacementScale: 0.2,
  })
);

scene.add(moon);

scene.background = spaceTexture;

const rocketTexture = new THREE.TextureLoader().load('./images/metalTextureMap.jpg');

let rocket; // Declare rocket variable
let astronaut; // Declare astronaut variable

const rocketLoader = new GLTFLoader();
rocketLoader.load('./models/rocket.glb', (gltf) => {
  rocket = gltf.scene;
  rocket.traverse((child) => {
    if (child.isMesh) {
      child.material.map = rocketTexture;
      child.material.needsUpdate = true;
    }
  });

  rocket.rotation.z = -45.55;

  rocket.position.set(0, 4.5, 14);
  rocket.scale.set(0.03, 0.03, 0.03);
  scene.add(rocket);

  // Initial call to update positions after the rocket is added to the scene
  updateObjectPositions();
}, undefined, (error) => {
  console.error(error);
});

const astronautLoader = new GLTFLoader();
astronautLoader.load('./models/little_astronaut.glb', (gltf) => {
  astronaut = gltf.scene;
  astronaut.position.set(4, -2, 55);
  astronaut.rotation.y = 4.5;
  astronaut.rotation.x = 0.2;
  astronaut.scale.set(1, 1, 1);
  scene.add(astronaut);

  // Initial call to update positions after the astronaut is added to the scene
  updateObjectPositions();
}, undefined, (error) => {
  console.error(error);
});

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.005;
  moon.rotation.y += 0.0075;
  moon.rotation.z += 0.005;

  camera.position.z = 30 + t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  moon.rotation.x += 0.001;
  moon.rotation.y += 0.001;
  moon.rotation.z += 0.001;

  if (rocket) {
    rocket.rotation.y += 0.01; // Rotate the rocket
  }

  controls.update();

  renderer.render(scene, camera);
}

animate();

function updateObjectPositions() {
  const screenWidth = window.innerWidth;

  console.log('Screen width:', screenWidth);
  if (screenWidth <= 500){
    if (rocket) {
      rocket.position.set(0, 1.9, 17);
    }
    if (moon) {
      moon.position.set(-4.5, 0.5, 46);
    }
  } else if (screenWidth <= 880) {
    if (moon) {
      moon.position.set(-4.5, 0.5, 46);
    }
    if (rocket) {
      rocket.position.set(9.5, 1.9, 17);
    }
    if (astronaut) {
      astronaut.position.set(6.4, -2.4, 57);
      astronaut.rotation.x += -0.6;
    }
  } else if (screenWidth < 1300) {
    moon.position.set(-5, 2, 40);
    if (astronaut) {
      astronaut.position.set(2, -2, 55);
    }
    if (rocket) {
      rocket.position.set(0, 4.5, 14);
    }
  } else {
    moon.position.set(-8.2, 2, 39.8);
    if (astronaut) {
      astronaut.position.set(4, -2, 55);
    }
    if (rocket) {
      rocket.position.set(0, 4.5, 14);
    }
  }

  console.log('Moon position:', moon.position);
  if (astronaut) {
    console.log('Astronaut position:', astronaut.position);
  }
  if (rocket) {
    console.log('Rocket position:', rocket.position);
  }
}

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  updateObjectPositions();
});

// Initial call to update positions after all objects are added to the scene
updateObjectPositions();
