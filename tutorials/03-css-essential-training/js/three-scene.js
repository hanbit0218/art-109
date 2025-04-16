// Three.js Scene for Portfolio
let renderer, scene, camera;
let cube, sphere;
let rotationSpeed = 0.01;
let cameraDistance = 6; // Increased to accommodate larger shapes
let gui;

// Configuration object for dat.GUI
const config = {
  rotationSpeed: 0.01,
  cubeColor: 0x3c8453, // Using primary color from CSS
  sphereColor: 0xbc6941, // Using accent color from CSS
  wireframe: false,
  resetCamera: function() {
    camera.position.z = cameraDistance;
    camera.position.y = -1.5;
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
  
  // Position camera a bit lower initially
  camera.position.y = -1.5;
  
  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // Transparent background
  container.appendChild(renderer.domElement);
  
  // Check if mobile device and adjust accordingly
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    // Reduce resolution for mobile
    renderer.setPixelRatio(window.devicePixelRatio * 0.7);
    config.rotationSpeed = 0.005; // Slower rotation
  }
  
  // Create lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Create a larger cube
  const cubeGeometry = new THREE.BoxGeometry(1.8, 1.8, 1.8); // Increased size
  const cubeMaterial = new THREE.MeshStandardMaterial({ 
    color: config.cubeColor,
    roughness: 0.5,
    metalness: 0.2
  });
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  
  // Position the cube to the left of center and lower
  cube.position.x = -1.5;
  cube.position.y = -1.0; // Positioned lower
  cube.position.z = 0;
  
  scene.add(cube);
  
  // Create a larger sphere
  const sphereGeometry = new THREE.SphereGeometry(1.3, isMobile ? 16 : 32, isMobile ? 16 : 32); // Increased size
  const sphereMaterial = new THREE.MeshStandardMaterial({ 
    color: config.sphereColor,
    roughness: 0.2,
    metalness: 0.3
  });
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  
  // Position the sphere to the right of center and lower
  sphere.position.x = 1.5;
  sphere.position.y = -1.0; // Positioned lower
  sphere.position.z = 0;
  
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
  
  gui.add(config, 'resetCamera').name('Reset Camera');
  
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
  const scrollHeight = document.body.scrollHeight - window.innerHeight;
  const percentScrolled = scrollHeight > 0 ? window.scrollY / scrollHeight * 100 : 0;
  
  // Map scroll percentage to camera position or object rotation
  // Move camera based on scroll, starting from a lower position
  camera.position.y = (percentScrolled * 0.005) - 1.5; // Start position is lower
  
  // Adjust object rotations based on scroll
  cube.rotation.x = percentScrolled * 0.05;
  sphere.rotation.y = percentScrolled * 0.05;
  
  // Add more dynamic movement for both shapes
  const time = Date.now() * 0.001; // Use time for continuous animation
  
  // More pronounced movement with multiple sine waves
  const baseY = -1.0; // Base Y position
  
  // Cube dynamic movement
  cube.position.y = baseY + Math.sin(time * 0.7) * 0.4; // More vertical movement
  cube.position.x = -1.5 + Math.sin(time * 0.5) * 0.7; // Horizontal movement
  cube.position.z = Math.sin(time * 0.3) * 0.5; // Depth movement
  
  // Sphere dynamic movement (with different phase)
  sphere.position.y = baseY + Math.sin(time * 0.7 + Math.PI) * 0.4; // Opposite phase
  sphere.position.x = 1.5 + Math.sin(time * 0.5 + Math.PI) * 0.7; // Opposite horizontal movement
  sphere.position.z = Math.sin(time * 0.3 + Math.PI) * 0.5; // Opposite depth
  
  // Dynamic rotation speeds
  cube.rotation.z = Math.sin(time * 0.2) * 0.2;
  sphere.rotation.z = Math.sin(time * 0.2 + Math.PI) * 0.2;
  
  // Pulsating scale effect
  const scaleBase = 1.0;
  const scaleVariation = 0.1; // Increased variation
  
  const cubeScale = scaleBase + Math.sin(time * 0.8) * scaleVariation;
  cube.scale.set(cubeScale, cubeScale, cubeScale);
  
  const sphereScale = scaleBase + Math.sin(time * 0.8 + Math.PI) * scaleVariation;
  sphere.scale.set(sphereScale, sphereScale, sphereScale);
}

// Initialize everything when the DOM is ready
document.addEventListener('DOMContentLoaded', init);