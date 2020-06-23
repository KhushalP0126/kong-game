
var player, player_running;
var ground;
var backgrd, backg
var FoodGroup, bananaImage;
var obstaclesGroup, obstacleImage;

var score=0;
var survivalTime=0;

function preload(){
 player_running  = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage=loadImage("Banana.png");
  
  obstacleImage=loadImage("stone.png");
  backg= loadImage("jungle.jpg");
}

function setup() {
  createCanvas(800,400);

    backgrd = createSprite(800,20,800,400);
  backgrd. addImage("background", backg);
  backgrd.velocityX= -4;
  backgrd.x=backgrd.width/1.5;
  backgrd.scale=1.5; 
  
  player = createSprite(100,340,20,50);
  player.addAnimation("runnning",player_running);
  player.scale=0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
 ground.visible=false;
  
   
  
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(backgrd.x<100){
    backgrd.x=backgrd.width/2;
  }
  
  if(FoodGroup.isTouching(player))
    {
      FoodGroup.destroyEach();
    score = score + 2;
    }  

  switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }


         
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
     
  
  
  if(obstaclesGroup.isTouching(player)){ 
        player.scale=0.08;
        score=score-2;
        obstaclesGroup.destroyEach(); 
    }

  
    player.collide(ground);
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 100,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.round(frameCount/4) 
  text("Survival Time: "+ survivalTime, 500,50);
}

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add image of banana
    banana.addImage(bananaImage);
    banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,340,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  
