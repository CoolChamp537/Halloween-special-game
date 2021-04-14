var ghost,ghostImg,rotated;
var witch, witchImg,witchImg2,witchGrp,witchSound;
var bg,bgImg;
var edges;
var gameState = "serve"
var score

var jumps;

function preload(){
ghostImg = loadAnimation("figure.png")
witchImg = loadAnimation("witch.png")
witchImg2 = loadAnimation("witch2.png")
rotated = loadAnimation("rotatedfigure.png")
  
  bgImg = loadAnimation("background.jpg")
  
  //controlsImg = loadImage("Controls.png")
  
  witchSound = loadSound("witch.mp3")
  
}

function setup() {
  createCanvas(600,600)
 ghost = createSprite(300,300,20,20)
ghost.addAnimation("standing",ghostImg)
ghost.addAnimation("lying down",rotated)
ghost.scale = 0.5
  ghost.visible = 1
  
  witchGrp = new Group();
  
  bg = createSprite(300,300,600,1000)
  bg.addAnimation("backg",bgImg)
  bg.scale = 1.5
  
   ghost.depth = bg.depth + 1
  
  /*controls = createSprite(300,400,20,20)
  controls.addImage("controlling",controlsImg)
  controls.depth = bg.depth + 1*/
  
  score = 0
  
  jumps = 1000
  
  edges = createEdgeSprites();
  
}

function draw() {
  background(255)
  
  if(keyDown("b")){
    gameState = "serve"
  }
  
  ghost.depth = bg.depth + 1
  ghost.visible = 1
  
  if(gameState === "serve"){
    background ("cyan")
    
    bg.visible = false
    ghost.visible = true
    //controls.visible = true
    ghost.scale = 1.5
    ghost.x = 300
    ghost.y = 300
    
    textSize(40)
    fill("blue")
    textAlign(CENTER)
    text("Press 'space' to begin!",300,210)
    text("Press 'c' to view the controls",300,270)
    
    fill("black")
    textSize(20)
    text("Note: the game might glitch sometimes.",300,500)
    text("Press 'b' to return to the main menu, then space to resume.",300,550)
    
    if(keyDown("space")){
      gameState = "play"
    }
    
    if(keyDown("c")){
      gameState = "controls"
    }
    
  }
  
  if(gameState === "controls"){
    
    background ("cyan")
    
    textSize(30)
    textAlign(CENTER)
    fill("blue")
    text("'Space' to jump",300,240)
    text("'Down arrow' / 's' to Duck (dodge)",300,280)
    text("(Press space to start, and 'escape' to exit)",300,360)
    
    if(keyDown("space")){
      gameState = "play"
      
    }
    
    if(keyDown("esc")){
      gameState = "serve"
    }
    
  }
  
  if(gameState === "play"){
    
  bg.visible = 1
    
  ghost.scale = 0.7
    
  ghost.debug = false
  //ghost.setCollider("aabb",0,0,60,200)
  
 drawSprites()
  spawns()
    
    textSize(40)
    fill("white")
    textAlign(CENTER)
    text("Jumps available: " + jumps,300,300)
    
    if(keyDown("down") || keyDown("s")){
      ghost.changeAnimation("lying down",rotated)
      ghost.setCollider("aabb",0,0,200,60)
      
    } else {
      ghost.changeAnimation("standing",ghostImg)
      ghost.setCollider("aabb",0,0,60,200)
    }
    
    if(keyDown("space") || keyDown("w") || keyDown("up")){
      ghost.velocityY = -10
      
      jumps = jumps - 5
      
    } else {
      ghost.velocityY = ghost.velocityY + 1
      
      jumps = jumps + 1
      
    }
    
    if(jumps < -0){
      ghost.velocityY = 5
      
      if(keyDown("space")){
        ghost.velocityY = 5
      }
      
    }
    
    //ghost.collide(edges[3])
    //ghost.collide(edges[2])
    
    if(ghost.isTouching(edges[3])){
      ghost.velocityY = 0
      
      if(keyDown("space")){
        ghost.velocityY = -5
      }
      
    }
    
    if(ghost.isTouching(edges[2])){
      ghost.velocityY = 5
    }
  
    if(witchGrp.isTouching(ghost)){
    gameState = "end"
  }
  
    textSize(30)
  textAlign(CENTER)
  fill("blue")
  text("Score: " + score,300,100)  
  }
    
  if(gameState === "end"){
    
    background ("blue")
    
    fill("cyan")
    textSize(35)
    textAlign(CENTER)
    text("You lose! Better luck next time!",300,250)
    
    fill("yellow")
    text("Press 'r' to restart!",300,350)
    
    witchGrp.velocityX = -30
    witchGrp.x = -30
    
    score.visible = 1
    
    if(keyDown("r")){
      gameState = "play"
      
      ghost.visible = true
      ghost.depth = bg.depth + 1
      
      score = 0
      
      jumps = 1000
      
    }
    
  }
}

function spawns(){
  
  if(frameCount % 200 === 0){
 
  witch = createSprite(-50,300)
  witch.addAnimation("flying",witchImg)
  witch.addAnimation("flipped",witchImg2)
  witch.scale = 0.2
  witch.velocityX = 5  
  witchGrp.add(witch)
  witch.debug = false
  witchSound.play()
  witch.lifetime = 600
  witch.y = Math.round(random(50,550))
    
  }
    if(witchGrp.isTouching(edges[1])){
    witchGrp.x = -50
    witchGrp.velocityX = 5
    witchGrp.bounceOff(edges[1])
    witch.changeAnimation("flipped",witchImg2)
    
    witchGrp.rotation = 180
    
    score = score + Math.round (1)
    
  }
}