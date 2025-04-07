let particles = [];
const numParticles = 80;
const colors = [
  '#3c8453',
  '#6ab47d',
  '#bc6941',
  '#415aaa'
];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-container');
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '-1');
  
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
  
  noStroke();
  console.log("p5.js setup complete");
}

function draw() {
  background(245, 245, 245, 10);
  
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }
  
  if (frameCount === 1) {
    console.log("p5.js draw function is running");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("Canvas resized");
}

class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
    this.acceleration = createVector(0, 0);
    this.size = random(2, 6);
    this.colorIndex = floor(random(colors.length));
    this.color = color(hexToRgb(colors[this.colorIndex]).r, hexToRgb(colors[this.colorIndex]).g, hexToRgb(colors[this.colorIndex]).b);
    this.maxSpeed = 2;
  }
  
  update() {
    if (mouseX !== 0 && mouseY !== 0) {
      let mousePos = createVector(mouseX, mouseY);
      let dir = p5.Vector.sub(mousePos, this.position);
      let distance = dir.mag();
      
      if (distance < 300) {
        dir.normalize();
        dir.mult(0.05);
        this.acceleration = dir;
      }
    }
    
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    
    if (this.position.x < 0) this.position.x = width;
    if (this.position.x > width) this.position.x = 0;
    if (this.position.y < 0) this.position.y = height;
    if (this.position.y > height) this.position.y = 0;
    
    this.acceleration.mult(0);
  }
  
  display() {
    let d = dist(mouseX, mouseY, this.position.x, this.position.y);
    let alpha = map(d, 0, 200, 150, 30);
    
    fill(red(this.color), green(this.color), blue(this.color), alpha);
    ellipse(this.position.x, this.position.y, this.size);
    
    for (let i = 0; i < particles.length; i++) {
      let other = particles[i];
      let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      
      if (distance > 0 && distance < 100) {
        let strokeAlpha = map(distance, 0, 100, 80, 0);
        stroke(red(this.color), green(this.color), blue(this.color), strokeAlpha);
        strokeWeight(0.3);
        line(this.position.x, this.position.y, other.position.x, other.position.y);
      }
    }
    noStroke();
  }
}

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  
  return { r, g, b };
}