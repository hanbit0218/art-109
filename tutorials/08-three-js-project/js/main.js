// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// ~~~~~~~~~~~~~~~~Set up~~~~~~~~~~~~~~~~
const scene = new THREE.Scene();
const light = new THREE.DirectionalLight(0xffffff, 3)
light.position.set(1,1,5);
scene.add(light);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader(); // to load 3d models

loader.load('/dog_shiny.gltf', function (gltf){
    const animal = gltf.scene;
    scene.add(animal);
    animal.scale.set(4, 4, 4);
}) 


// ~~~~~~~~~~~~~~~~ Create scene here ~~~~~~~~~~~~~~~~
// Create a cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// Create a torus (donut shape)
const torusGeometry = new THREE.TorusGeometry(1.5, 0.5, 16, 100);
const torusMaterial = new THREE.MeshBasicMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.x = 3; // Position it to the right of the cube
scene.add(torus);

// Move the camera back so we can see the cube
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    // Rotate the torus
    torus.rotation.x += 0.02;
    torus.rotation.z += 0.02;

    controls.update();
    renderer.render(scene, camera);
}

animate();