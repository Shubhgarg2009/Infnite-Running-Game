const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;


//calling variables
var cactus, cactusImage, cactusGroup;
var flyDino, flyDinoImage, flyDinoGroup;
var trex, trex_running,trexIMG;
var backgroundy, backgroundImage;
var score= 0;
var ground;

function preload(){
//loading image for background  
  backgroundImage= loadImage("jungle.jpg");

//loading animation for trex
trexIMG= loadAnimation ("trex.png");

//loading images for flyDino and cactuss
  flyDinoImage= loadImage("flyDino.png");
  cactusImage= loadImage("cactus.png");
}

function setup() {
//creating canvas  
  createCanvas(800,400);

//creating background sprite
  backgroundy= createSprite (200,200);
  backgroundy.addImage (backgroundImage);
  backgroundy.velocityX= -2;
  backgroundy.scale=5.6;
//creating trex sprite
  trex= createSprite (50,340,10,10);
  trex.addAnimation(trexIMG);
  trex.scale= 0.7;

//creating ground sprite
  ground= createSprite (0,390,800,10);
  ground.visible= false;

//creating groups for flyDino and cactuss
  flyDinoGroup= new Group ();
  cactusGroup= new Group ();
}

function draw() {
//assigning background color
  background("white");

//to know the position of trex to make more changes
  console.log(trex.y);

//reseting background
  if (backgroundy.x<150) {
    backgroundy.x= 200
  }   

//making the trex jump  
  if (keyDown ("space")&& trex.y>=355) {
    trex.velocityY= -20;  
  }    
  
//adding gravity to trex
  trex.velocityY= trex.velocityY + 0.8;

//preventing the trex from falling off the ground
  trex.collide (ground);

//scoring system and changing size of the trex
  if (flyDinoGroup.isTouching(trex)) {
    score= score+2;
    flyDinoGroup.destroyEach();
  }

  switch (score) {
    case 10: trex.scale= 0.15;
    break;
    case 20: trex.scale= 0.20;
    break;
    case 30: trex.scale= 0.25;
    break;
    case 40: trex.scale= 0.30;
    break;
    case 50: trex.scale= 0.35;
    break;
    default: break;
  }

  if (cactusGroup.isTouching(trex)) {
    score= 0;
    cactusGroup.destroyEach();
    trex.scale= 0.1;
  }

 
//calling user-defined functions
  spawnflyDinos();
  spawncactuss();

//drawing sprites
  drawSprites();

//displaying score
  stroke ("white");
  textSize (15);
  text ("Score: "+score,190,70);  
}

//function for flyDinos
function spawnflyDinos () {
if (frameCount%90===0) {
  flyDino= createSprite (360,120,10,10);  
  flyDino.addImage ("flyDinoimage", flyDinoImage);
  flyDino.scale= 0.4;
  flyDino.velocityX= -3;
  
  //adding lifetime to flyDinos
    flyDino.lifetime= 150;
  
  //adding flyDino to flyDino group
    flyDinoGroup.add(flyDino);
}
}

//function for cactuss
function spawncactuss () {
if (frameCount%90===0) {
  cactus= createSprite (400,370,10,10);
  cactus.addImage ("cactusimage", cactusImage);
  cactus.scale= 0.4;
  cactus.velocityX= -4;
  
  //adding cactus to cactus group
    cactusGroup.add(cactus);
}
}