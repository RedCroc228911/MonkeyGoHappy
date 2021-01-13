var PLAY = 1;
var END = 0;
var gameState = PLAY;

var survivalTime = 0;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var flag = 0;
var forestImage,forest;
var score;
var flag = 0;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkeyImage = loadImage("sprite_0.png");
  gameoverImage = loadImage("gameover.png");
  
  forestImage = loadImage("forest2.png");
}

function setup() {
  obstacle=null;
  ground = createSprite(0,320,900,10);
  //ground.velocityX = -4;
  //ground.x = ground.width/2;

  forest = createSprite(400,200, 800,400);
  forest.velocityX = -4;
  //forest.x = forest.width/2;
  //console.log(forest.x);
  forest.addImage(forestImage);
  forest.scale = 0.6;

  monkey = createSprite(70,318,100,100);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  monkey.setCollider("circle",0,0,330);
  monkey.debug = false;

  gameover = createSprite(180,200,20,20);
  gameover.addImage(gameoverImage);

  score=0;

  obstacleGroup = createGroup();
  foodGroup     = createGroup();
}


function draw() {
  //background("lightblue");
 // background(forestImage);
  
  if (gameState === PLAY) {
    gameover.visible = false;
    spawnObstacles();
    spawnBanana();
    
     if(ground.x<0){
      ground.x = ground.width/2;
    } 
    
    if(obstacleGroup.isTouching(monkey)){
       if(flag===1){
         gameState = END;
         //obstacleGroup.destroyEach();
         //monkey.destroy();
         //obstacleGroup.destroyEach();
         //foodGroup.destroyEach();
       } 
      else if (flag===0){
        monkey.scale = 0.1;
        ground.scale = 1;
        obstacleGroup.destroyEach();
        flag=flag+1;
      }
    }
   
    if(foodGroup.isTouching(monkey)){
      monkey.scale = monkey.scale+0.01;
      ground.scale = ground.scale  -0.01;
      foodGroup.destroyEach();
      score = score+2;
    }

    if(keyDown("space")) {
      if(monkey.y>=200){
        monkey.velocityY = -12;
      }
      console.log("y="+monkey.y+":"+monkey.scale);
    }
 
    //if(monkey.y < 320) {
      monkey.velocityY = monkey.velocityY+0.8;
    /*} else {
      monkey.velocityY = 0;
    }*/
    
    if(forest.x <120){
      forest.x = 400;
      //console.log(forest.x);
    }
    
    monkey.collide(ground);
    ground.visible= true;
//    drawSprites();  
        
     switch(score){
       case 10: monkey.scale = 0.12;
                break;
       case 20:monkey.scale = 0.14;
                break;
       case 30:monkey.scale = 0.16;
                break;
       case 40:monkey.scale = 0.18;
                 break;
       default:break;
     }
  } 
  else if (gameState === END) {
    gameover.visible = true;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.destroy();
    //ground.destroy();
    forest.velocityX = 0;
  }
  drawSprites();  
  stroke("white");
  textSize(20);
  fill("white")
  text("score:"+score,300,50);  
}

function spawnObstacles(){
 if (frameCount % 300=== 0){
   obstacle = createSprite(400,330,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6 ;
   obstacle.lifetime = 100; 
   obstacle.scale=0.1;
   obstacle.setCollider("circle",0,0,330);
   obstacle.debug = false;
   obstacleGroup.add(obstacle);
 }
}

function spawnBanana(){
 if (frameCount % 80=== 0){
   banana = createSprite(400,200,10,40);
   banana.addImage(bananaImage);
   banana.velocityX = -6 ;
   banana.lifetime = 100; 
   banana.scale=0.1;
   banana.setCollider("circle",0,0,330);
   banana.debug = false;
   foodGroup.add(banana);
 }
}




