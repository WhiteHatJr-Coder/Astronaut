var PLAY=1;
var END=0;
var gameState=PLAY;
var runner, ground;
var obstacleGroup, score, designGroup;
var designs, ship, shipEngineL,shipEngineR, shipEx1,shipEx2;
var fire1,fire2,fire3,fire4;

function preload(){

}

function setup(){
createCanvas(600,300);

  runner=createSprite(500,50,30,30);
  
  ground=createSprite(250,300,1250,50);
  ground.shapeColor="gray"
  ground.x=ground.width/2;
  
  upperGround=createSprite(500,-5,1250,50)
  upperGround.x=upperGround.width/2;
  
  ship=createSprite(250,125,70,150);
  ship.shapeColor="white";
  shipEngineL=createSprite(200,225,20,40);
  shipEngineL.shapeColor="white";
  shipEngineR=createSprite(300,225,20,40);
  shipEngineR.shapeColor="white";
  shipEx1=createSprite(200,200,30,15);
  shipEx1.shapeColor="white";
  shipEx2=createSprite(300,200,30,15);
  shipEx2.shapeColor="white";
 // fire1=createSprite(200,270,10,10);
  
  
  ship.visible=false;
  shipEngineL.visible=false;
  shipEngineR.visible=false;
  shipEx1.visible=false;
  shipEx2.visible=false; 
  

  
  obstacleGroup=createGroup();
  designGroup=createGroup();
  
  runner.setCollider("rectangle",0,0,20,20);
  
  score=0;
  Oxygen=1000;
}

function draw(){
background(100);  
  stroke("white")
  fill("white")
  text("Moon Rock: "+ score, 200,30);
    
  text("Oxygen: "+ Oxygen, 300,30);
  
  if(gameState===PLAY){
    ground.velocityX=-(5+3*score/100);
    score=score+Math.round(getFrameRate()/60);
    Oxygen=Oxygen+Math.round(getFrameRate()/-60)
    if(ground.x<0){
      ground.x=ground.width/2;
      upperGround.x=upperGround.width/2;
    }
    if(keyDown("UP_ARROW")&& runner.y>=1){
      runner.velocityY=-5;
    }
    if(keyDown("DOWN_ARROW")&& runner.y>=1){
      runner.velocityY=2;
    }
        if(keyDown("RIGHT_ARROW")&& runner.y>=1){
      runner.velocityY=2; 
    }
    runner.velocityY=runner.velocityY+0.1;
    design();
    obstacle();
    if(obstacleGroup.isTouching(runner)){
      gameState=END;
    }
  }
  else if(gameState===END){
    ground.velocityX=0;
    runner.velocityY=0;
    runner.x=250
    runner.y=125
    runner.shapeColor="black";
    
    ship.depth=runner.depth;
    runner.depth=runner.depth+1;
    
  ship.visible=true;
  shipEngineL.visible=true;
  shipEngineR.visible=true;
  shipEx1.visible=true;
  shipEx2.visible=true; 
    
    text("GameOver",350,100);
    
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityEach(0);
  }
  
  if(Oxygen<=0){
    gameState=END;
  }
  
  runner.bounceOff(ground);
  runner.bounceOff(upperGround);
  //var select obstacle
    
  drawSprites();
}

function design(){
var designs = createSprite(1,Math.round(random(20,370)), 10,10);
  designs.lifeTime=50;
  designs.velocityX=5
  designGroup.add(designs);
}

function obstacle(){
  var r;
  if (World.frameCount%45===0){
    Obstacle=createSprite(100,100,50,50);
    r = Math.round(random(1, 2));
    if (r === 1) {
      Obstacle.shapeColor="white";
    } else {
      Obstacle.shapeColor="white";
    }
    Obstacle.y = Math.round(random(10, 250));
    Obstacle.velocityX = (6 + 3*score/500);
    Obstacle.scale = 0.2;
    Obstacle.setLifeTime = 15;
    obstacleGroup.add(Obstacle);
  }
}
