var play = 1;
var end = 0;
var gameState =1;
var monkey , monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var survivalTime;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
survivalTime = 0; 
score = 0;
monkey = createSprite(80,315,20,20); 
monkey.addAnimation("running",monkey_running);
monkey.scale = 0.1;
 
ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
ground.x = ground.width/2;
obstacleGroup = new Group();
bananaGroup = new Group();
}


function draw() {
background("white");
ground.x = ground.width/2;
monkey.collide(ground);

stroke("black");
textSize(20);
fill("black");
text("score: "+ score, 110, 15);

stroke("black");
textSize(20);
fill("black");
survivalTime = Math.round(frameCount/frameRate());
text("survival Time: "+ survivalTime, 100,50);
if(gameState === play) {
if(keyDown("space")&& monkey.y >314) {
    monkey.velocityY = -18;
     }
 monkey.velocityY = monkey.velocityY + 0.8;

if (monkey.isTouching(bananaGroup)) {
bananaGroup.destroyEach();
score = score + 1;
}
spawnBanana();
spawnObstacles();
  
if (monkey.isTouching(obstacleGroup)) {
obstacleGroup.setVelocityXEach(0);
bananaGroup.setVelocityXEach(0);
obstacleGroup.setLifetimeEach(-1);
bananaGroup.setLifetimeEach(-1);
gameState = end;
}
} 
if (gameState ===end){
obstacleGroup.setVelocityXEach(0);
bananaGroup.setVelocityXEach(0);
obstacleGroup.setLifetimeEach(-1);
bananaGroup.setLifetimeEach(-1);
}

drawSprites();    
}

function spawnBanana() {
if(frameCount%80 ===0){
var banana = createSprite(400,200,20,20);
  banana.scale = 0.1;
banana.addImage(bananaImage);
banana.velocityX = -5;
banana.y = Math.round(random(120,200));
  banana.lifetime = 200;
bananaGroup.add(banana);
}  
}
function spawnObstacles() {
if(frameCount%300 === 0) {
var obstacle = createSprite(400,330,20,20);
obstacle.addImage(obstacleImage);
obstacle.scale = 0.1;
obstacle.velocityX = -5;
obstacleGroup.add(obstacle); 
}
}