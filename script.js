// Define variables for the number of eyes, mouth, and a variable to change the hairpin color.
let eyes = 1;
let mouth = 1;
var value1 = 0;

function setup() {
// Create a canvas
  createCanvas(400, 400);
  angleMode(DEGREES);
 }

function draw() {
  background("#324554");
  
  //Draw face 
  fill("#FEE3D4");
  ellipse(200,220,460,403);
 
  //Draw Hair
  noStroke()
  fill("#465866")
  push();
  translate(75.11, 47.87);
  rotate(-20);
  ellipse(0,0, 416.8, 316);
  fill("#3D4D5C");
  ellipse(0,0, 416.8, 210);
  fill("#324554");
  ellipse(0,0, 416.8, 150);
  pop()
  
  push()
  translate(427.1, 1.5);
  rotate(10);
  fill("#3D4D5C");
  ellipse(0,0, 336.6,368.3);
  fill("#324554");
  ellipse(0,0, 336.6,248.3);
  pop()

  //Draw Blush
  push();
  fill("#E9A093");
  circle(0,270,100);
  circle(400,270,100);
  pop()
  
  //Draw Nose
  push();
  fill("#E9A093");
  triangle(200,270,190, 300, 210, 300);
  pop()
  
  //Draw eyes1
  if(eyes === 1){ 
  push();
  fill("#3D4D5C");
  ellipse(120, 250, 25, 40);
  strokeWeight(3);
  stroke("#3D4D5C");
  noFill();
  arc(280,250,30,40,180,0);
  pop()
 }
  
  //Draw eyes2
  if(eyes === 2){
  push();
  fill("#3D4D5C");
  ellipse(120, 250, 25, 40);
  strokeWeight(3);
  stroke("#3D4D5C");
  ellipse(280,250,25,40);
  pop()
 }

  //Draw eyes3
  if(eyes === 3) {
  push();
  strokeWeight(3);
  stroke("#3D4D5C");
  noFill();
  arc(120, 250,30,40,180,0);
  arc(280,250,30,40,180,0);
  pop()
 }

  //Draw eyes4
  if (eyes === 4) {
  push();
  strokeWeight(3);
  stroke("#3D4D5C");
  noFill();
  line(110.29,230.59,130.29,244.59)
  line(129.71, 244.59, 109.71, 258.59)
  line(288.71,230.39,268.71,244.59)
  line(269.29,244.59,289.29,258.59)
  pop()
 }

  //Draw mouth1 
  if (mouth === 1) {
  push();
  translate(0,-100);
  noFill();
  strokeWeight(3);
  stroke("#3D4D5C")
  arc(200,430,60,30,0,180);
  pop()
 }

  //Draw mouth2
  if (mouth === 2) {
  push();
  fill("#3D4D5C");
  ellipse(200, 350, 37, 60);
  pop()
 }

  //Draw mouth3
  if (mouth === 3) {
  push();
  noFill();
  strokeWeight(3);
  stroke("#3D4D5C")
  line(170,339.5,230,339.5)
  pop()
   }

  //Draw mouth4
  if (mouth === 4) { 
  push();
  translate(0,-100);
  noFill();
  strokeWeight(3);
  stroke("#3D4D5C")
  arc(200,440,60,30,180,360);
  pop();
 }
  
  //Draw hairpin 
  push();
  translate(5,80);
  rotate(320);
  fill(value1);
  rect(40, 100, 10, 80);
  rect(20, 80, 10, 80)
 }

//Change the hairpin color to a random color when the mouse is clicked.
function mouseClicked(){
  if (value1 == 0){
    value1 = color(random(255), random(255), random(255));
  }else{
    value1 = color(random(255), random(255), random(255));
   } 
 }

//Handle key presses to change the eye and mouth expressions.
  function keyPressed() {
  if (keyCode === RIGHT_ARROW && eyes === 1) {
    eyes = 2; 
  } else if (keyCode === RIGHT_ARROW && eyes === 2) {
    eyes = 3;
  } else if (keyCode === RIGHT_ARROW && eyes === 3) {
    eyes = 4;
  } else if (keyCode === RIGHT_ARROW && eyes === 4) {
    eyes = 1;
  }
    
  if (keyCode === LEFT_ARROW) {
    if (eyes === 1) {
      eyes = 4;
    } else {
      eyes--;
    }}
  if (keyCode === UP_ARROW && mouth === 1) {
    mouth = 2; 
  } else if (keyCode === UP_ARROW && mouth === 2) {
    mouth = 3;
  } else if (keyCode === UP_ARROW && mouth === 3) {
    mouth = 4;
  } else if (keyCode === UP_ARROW && mouth === 4) {
    mouth = 1;
  }
    
  if (keyCode === DOWN_ARROW) {
    if (mouth === 1) {
      mouth = 4;
    } else {
      mouth--;
   }
  }
 }
