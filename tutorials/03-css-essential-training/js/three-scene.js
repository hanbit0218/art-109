// Three.js Scene for Portfolio
let renderer, scene, camera;
let cube, sphere;
let rotationSpeed = 0.01;
let cameraDistance = 5;
let gui;

// Configuration object for dat.GUI
const config = {
  rotationSpeed: 0.01,
  cubeColor: 0x3c8453, // Using primary color from CSS
  sphereColor: 0xbc6941, // Using accent color from CSS
  wireframe: false,
  resetCamera: function() {
    camera.position.z = cameraDistance;
    camera.position.y = 0;
    camera.position.x = 0;
  }
};

function init() {
  // Get the container
  const container = document.getElementById('three-div');
  if (!container) {
    console.error('Three.js container not found');
    return;
  }

  // Create scene
  scene = new THREE.Scene();
  
  // Set up camera
  const aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.z = cameraDistance;
  
  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // Transparent background
  container.appendChild(renderer.domElement);
  
  // Create lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Create a cube
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshStandardMaterial({ 
    color: config.cubeColor,
    roughness: 0.5,
    metalness: 0.2
  });
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.x = -1.5;
  scene.add(cube);
  
  // Create a sphere
  const sphereGeometry = new THREE.SphereGeometry(0.75, 32, 32);
  const sphereMaterial = new THREE.MeshStandardMaterial({ 
    color: config.sphereColor,
    roughness: 0.2,
    metalness: 0.3
  });
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = 1.5;
  scene.add(sphere);
  
  // Set up GUI
  setupGUI();
  
  // Add event listeners
  window.addEventListener('resize', onWindowResize);
  
  // Start animation loop
  animate();
}

function setupGUI() {
  gui = new dat.GUI({ autoPlace: true });
  gui.domElement.id = 'gui';
  
  const rotationFolder = gui.addFolder('Rotation');
  rotationFolder.add(config, 'rotationSpeed', 0, 0.1).name('Speed');
  
  const colorFolder = gui.addFolder('Colors');
  colorFolder.addColor({ cubeColor: '#' + config.cubeColor.toString(16).padStart(6, '0') }, 'cubeColor')
    .name('Cube Color')
    .onChange(function(value) {
      cube.material.color.set(value);
    });
  
  colorFolder.addColor({ sphereColor: '#' + config.sphereColor.toString(16).padStart(6, '0') }, 'sphereColor')
    .name('Sphere Color')
    .onChange(function(value) {
      sphere.material.color.set(value);
    });
  
  const materialFolder = gui.addFolder('Material');
  materialFolder.add(config, 'wireframe').onChange(function(value) {
    cube.material.wireframe = value;
    sphere.material.wireframe = value;
  });
  
  gui.add(config, 'resetCamera');
  
  // Start with folders closed
  rotationFolder.open();
  colorFolder.open();
  materialFolder.open();
  
  // Make GUI hidden by default
  gui.close();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  
  // Apply rotation speed from GUI
  rotationSpeed = config.rotationSpeed;
  
  // Rotate objects
  cube.rotation.x += rotationSpeed;
  cube.rotation.y += rotationSpeed;
  
  sphere.rotation.x += rotationSpeed * 0.5;
  sphere.rotation.y += rotationSpeed * 0.7;
  
  // Apply scroll animation
  animateOnScroll();
  
  // Render scene
  renderer.render(scene, camera);
}

function animateOnScroll() {
  // Calculate scroll percentage
  const percentScrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  
  // Map scroll percentage to camera position or object rotation
  // Move camera based on scroll
  camera.position.y = percentScrolled * 0.005 - 2; // Adjust multiplier as needed
  
  // Adjust object rotations based on scroll
  cube.rotation.x = percentScrolled * 0.05;
  sphere.rotation.y = percentScrolled * 0.05;
  
  // You can add more animations here based on percentScrolled
}

// Initialize everything when the DOM is ready
document.addEventListener('DOMContentLoaded', init);