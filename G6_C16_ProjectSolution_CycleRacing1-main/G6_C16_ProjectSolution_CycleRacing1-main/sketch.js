var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2,op1,op2,op3;
var distance = 0;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var riderGroup;
var go;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");
  go = loadImage("gameOver.png");
  // load animation of any 2 opponents
  op1=loadAnimation("opponent1.png","opponent2.png");
  op2=loadAnimation("opponent7.png","opponent8.png");


}

function setup(){
  
createCanvas(600,600);
  
// Moving background
path=createSprite(300,300);
path.scale=2
path.addImage(pathImg);
path.velocityX = -7;

//creating boy running with running anf falling animation
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.addAnimation("stop",mainRacerImg2);
mainCyclist.debug = true;
mainCyclist.setCollider("circle",0,0,600)
  
mainCyclist.scale=0.1;
  
// adjust scale of player

riderGroup = new Group();

gameOver = createSprite(300,300);
gameOver.addImage(go);
gameOver.visible = false;
    
}

function draw() {
  background(0);
  textSize(30);
  fill(255);

  drawSprites();
  text("distance:" + distance,100,100);
  
  
  
  if(gameState === PLAY){
  // moving player up and down with mouse
   mainCyclist.y = World.mouseY;

   distance = distance + Math.round(getFrameRate()/60)
  
   // Creating edge sprites and collide mainCyclist with edges
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  riders()  ;
   if(riderGroup.isTouching(mainCyclist)){
     gameState = END;
   }  

  } 

  if(gameState === END){
    gameOver.visible = true;
    path.velocityX = 0;
    textSize(20);
    mainCyclist.velocityY = 0;
    mainCyclist.changeAnimation("stop",mainRacerImg2);
  }
 }
  
  


function riders(){
  if (frameCount%100===0){
    // create rider sprite, assign random y position and give negative x velocity
    var rider=createSprite(600,random(100,500))
    rider.velocityX=-6

    // using if else assign 2 different animation to riders / opponents

    var r = Math.round(random(1,2))
    if(r==1){
      rider.addAnimation("running",op1) 
    }
    else{
      rider.addAnimation("running",op2) 
    }
    rider.debug=true;
    rider.setCollider("circle",0,0,600)
    rider.scale=0.1
    
    //assign lifetime
    rider.lifetime=300
    riderGroup.add(rider);
  }
}