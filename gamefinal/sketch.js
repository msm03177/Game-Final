var snake;
var scl = 20;
var imageWifi;
var food;

function preLoad() {
	img = loadImage('images/wifi.jpg');
}

function setup(){
  createCanvas(600,600);
  snake = new Snake();
  frameRate(15);
  pickLocation();
}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}


function draw() {
background(0);
  snake.death();
  snake.update();
  snake.show();
	
text('Collect "Wi-Fi" and watch your internet bill grow - life without net neutrality', 10, 15);


	
if (snake.eat(food)) {
   pickLocation();
}
  
  fill(242,242,242);
	rect(food.x, food.y, scl, scl);

	
	
}



function keyPressed() {
    if (keyCode === UP_ARROW) {
    snake.dir(0, -1);
}
		else if (keyCode === DOWN_ARROW){
    snake.dir(0, 1);
}	
		else if (keyCode === LEFT_ARROW){
    snake.dir(-1, 0);
}
		else if (keyCode === RIGHT_ARROW){
    snake.dir(1, 0);
}
}

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  this.dir = function(x, y){
  this.xspeed = x;
  this.yspeed = y;  
}
  
this.eat = function(pos) {
  var d = dist(this.x, this.y, pos.x, pos.y);
  	if (d < 4) {
      this.total++;
      return true;
}
	else{
  return false;
}
}
  
this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
      this.total = 0;
      this.tail = [];
}
}
}
  
this.update = function () {
  for (var i = 0; i < this.tail.length-1; i++) {
    this.tail[i] = this.tail[i+1];
}
    this.tail[this.total-1] = createVector(this.x, this.y);
    this.x = this.x + this.xspeed*scl;
    this.y = this.y + this.yspeed*scl;
    this.x = constrain(this.x, 0, width-scl);
    this.y = constrain(this.y, 0, height-scl);
}

  this.show = function() {
    fill(1,254,0);
    for (var i = 0; i < this.total; i++){
     rect(this.tail[i].x,this.tail[i].y, scl, scl);
} 
  rect(this.x, this.y, scl, scl);
}
}