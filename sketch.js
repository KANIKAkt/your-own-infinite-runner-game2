var PLAY =1;
var END = 0;
var gameState = 1;

var bg, bgImg, hurdle, hurdleImg, invisibleGnd, invisibleGnd2, invisibleGnd3, edges;
var  greenGirl, purpleGirl, orangeGirl, greenGirlImg, purpleGirlImg, orangeGirlImg;
var score = 0;
var gameOver, gameOverImg, jump;
function preload(){

  bgImg = loadImage("track.jpg");
 greenGirlImg = loadAnimation("green.png", "green2.png", "green3.png");
  greenGirlImg2 = loadImage("green.png");
  orangeGirlImg = loadAnimation("orange.png", "orange2.png", "orange3.png");
  orangeGirlImg2 = loadImage("orange2.png");
  purpleGirlImg = loadAnimation("purple.png", "purple2.png", "purple3.png", "purple4.png");
  purpleGirlImg2 = loadImage("purple.png")
  hurdleImg = loadImage("hurdle.png");
  gameOverImg = loadAnimation("game_over.png", "game_over2.png", "game_over3.png", "game_over4.png","game_over5.png");
  tryAgainImg = loadImage("tryAgain.png");
  jumpSound = loadSound("jump4.mp3");
  gameOSound = loadSound("gameOver.mp3");
}

function setup() {
 createCanvas(650, 520);
  
  bg = createSprite(300, 200);
  bg.addImage(bgImg);
  bg.scale = 4.6; 
  bg.velocityX = -3;
  
  orangeGirl = createSprite(90, 160);
  orangeGirl.addAnimation("running", orangeGirlImg);
  orangeGirl.scale = 0.3;
  orangeGirl.setCollider("rectangle", -40, 0, 700, 350); 
  
  greenGirl = createSprite(70, 300);
  greenGirl.addAnimation("running",greenGirlImg);
  greenGirl.scale = 0.3;
  greenGirl.setCollider("circle", 0, 0, 150)
  
  purpleGirl = createSprite(70, 500);
  purpleGirl.addAnimation("running", purpleGirlImg);
  purpleGirl.scale = 0.4;
  purpleGirl.setCollider("rectangle", 30, 0, 500, 300);
  
  gameOver = createSprite(325, 230);
  gameOver.addAnimation("gameover",gameOverImg);
  gameOver.scale = 1.9;
  gameOver.visible = false;
  
  tryAgain = createSprite(325, 340);
  tryAgain.addImage(tryAgainImg);
  tryAgain.scale = 1;
  tryAgain.visible = false;
  
  invisibleGnd = createSprite(70, 240, 100, 10);
  invisibleGnd.visible = false;
  invisibleGnd2 = createSprite(70, 360, 100 ,10);
  invisibleGnd2.visible = false;
  invisibleGnd3 = createSprite(70, 510, 100, 10);
  invisibleGnd3.visible = false;
  
  hurdleG = new Group();
  hurdleG2 = new Group();
  hurdleG3 = new Group();
  edges = createEdgeSprites();
}

function draw() {
 background(0);
 
  orangeGirl.velocityY += 0.8;
   greenGirl.velocityY += 0.8;
   purpleGirl.velocityY += 0.8;
  
 if(gameState === PLAY){
   
  //score = score + Math.round(frameCount/200);
   score = score + Math.round(getFrameRate()/60);
   bg.velocityX = -(6 + 3*score/150);
   if(bg.x < 0){
     bg.x = bg.width/2;
    }
   if(keyDown("Space") && greenGirl.y>= 250){
     greenGirl.velocityY = -15;
     jumpSound.play();
   }
     
   // greenGirl.depth = hurdle.depth;
   // greenGirl.depth += 1;
   
   if(orangeGirl.isTouching(hurdleG) ){
     orangeGirl.velocityY = orangeGirl.velocityY - 1.5;
   }
   if(purpleGirl.isTouching(hurdleG3)){
     purpleGirl.velocityY = purpleGirl.velocityY -1.5;
   }
   
   spawnHurdles();
   
   if(greenGirl.isTouching(hurdleG2)){
     gameState = END;
     gameOSound.play();
   }
 }
  
  if(gameState === END){
    bg.velocityX = 0;
    
    orangeGirl.addImage(orangeGirlImg2);
    greenGirl.addImage(greenGirlImg2);
    purpleGirl.addImage(purpleGirlImg2);
    hurdleG.destroyEach();
    hurdleG2.destroyEach();
    hurdleG3.destroyEach();
    gameOver.visible = true;
    tryAgain.visible = true;
    purpleGirl.y = 300;
  
    if(mousePressedOver(tryAgain)){
      reset();
    }
  }
  orangeGirl.collide(invisibleGnd);
  greenGirl.collide(invisibleGnd2);
  purpleGirl.collide(invisibleGnd3);
  
  drawSprites();
  textSize(25);
  fill("blue");
  stroke("lightblue");
  strokeWeight(4);
  text("Score: "+ score, 500, 30); 
}
function reset(){
  gameState = PLAY;
  score = 0;
  gameOver.visible = false;
  tryAgain.visible = false;
  purpleGirl.y = 500;
  
}
function spawnHurdles(){
  if(frameCount% 100 === 0){
    hurdle = createSprite(700, 190);
    hurdle.addImage(hurdleImg);
    hurdle.scale = 0.3;
    hurdle.velocityX = -5;
    hurdle.setCollider("rectangle", -100, 0, 300, 300);
    hurdle.velocityX -= (2 + 3*score/150);
    
    hurdle2 = createSprite(700, 320);
    hurdle2.addImage(hurdleImg);
    hurdle2.scale = 0.3;
    hurdle2.velocityX = -5;
    hurdle2.setCollider("circle", -70, -50, 130);
    hurdle2.velocityX -= (2 + 3*score/150);
    
    hurdle3 = createSprite(700, 480);
    hurdle3.addImage(hurdleImg);
    hurdle3.scale = 0.3;
    hurdle3.velocityX = -5;
    hurdle3.setCollider("rectangle", -100, 0, 300, 300);
    hurdle3.velocityX -= (2 + 3*score/150);
    
    hurdle.lifetime = 220;
    hurdle2.lifetime = 220;
    hurdle3.lifetime = 220;
    hurdleG.add(hurdle);
    hurdleG2.add(hurdle2);
    hurdleG3.add(hurdle3); 
  }
}