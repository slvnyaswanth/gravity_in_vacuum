let z=0
let vel
let G = 6;  
let rep=1
let particless = [];

function setup() {
  createCanvas(600, 600,WEBGL);
  for (let i = 0; i < 8; i++) {
    let m = random(50, 150);
      let x = random((width/2));
    let y = random((height/2));
  
    particless[i] = new particles(x, y, m);
  }
  mo=new particles()
  attractor = new Attractor(width /50, height / 50, 100);
  Button = createButton('rep');
  Button.position(10, 10);
       Button.mousePressed(repulsive)
buttongrav=createButton("increase gravity")
  buttongrav.position(10,30)
  buttongrav.mousePressed(increasegrav)
buttonpath =createButton("+path")
  buttonpath.position(10,50)
  buttonpath.mousePressed(incrpath)
  buttonwin =createButton("+wind towards right")
  buttonwin.position(10,80)
  buttonwin.mousePressed(wind) 

  
}
function incrpath(){
mo.increpath()
}
function increasegrav(){
  G+=10
  print(" gravitation force increased by"+G)
}
function wind(){
  z=z+50
   print("wind applied right in"+z)
}
function repulsive(){
    rep=-0.09
print("repulsive force applied")
}
function preload() {
  img = loadImage('galaxy.jpg');
}
function draw() {
  
  for (let particles of particless) {
    particles.update(); 
    particles.show();
    attractor.attract(particles); 

  }//    if(mouseIsPressed){
   // attractor.pos.x = mouseX;
   // attractor.pos.y = mouseY;}
  push()
  texture(img)
  rect(-600,-600,1200,1200)
  pop()

  
  attractor.show();
}

let v=0
class particles {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
  this.vel.mult(5);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass)*2;
  }
increpath(){
  
  v=v+0.1 
  print("path is increased by"+v)

    
}
  applyForce(force) { 

    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  } 

  update() {
  this.acc.add(v)
  
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    
  } 
   
  show() {
    
  push()
    
      fill(random(255),random(255),random(255));
    translate(this.pos.x+z, this.pos.y)
    sphere( this.r);
    noStroke()
  pop()
  }
}
let force 

class Attractor {
  
  constructor(x,y,m) {
    this.pos = createVector(x,y);
    this.mass = m;
    this.r = sqrt(this.mass)*2;
  }
  
  attract(particles) {
    force = p5.Vector.sub(this.pos, particles.pos);
  force.mult(this.mass*50)
    
    noStroke()
    strokeWeight(0.5);
    stroke("grey")
    line(this.pos.x,this.pos.y,particles.pos.x,particles.pos.y)
  
    let distanceSq = constrain(force.magSq(), 100, 1000);
    let strength =rep*G * (this.mass * particles.mass) / distanceSq;
    force.setMag(strength);
    particles.applyForce(force);
  }

  
  show() {
    push()
    strokeWeight(3)
    stroke("yellow")
 fill(random(255),random(255),0)   
    ellipse(this.pos.x, this.pos.y, this.r*2); 
    pop()
  }
}
