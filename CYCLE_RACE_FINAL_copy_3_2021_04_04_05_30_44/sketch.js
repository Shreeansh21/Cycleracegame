var path, mainCyclist;
var pathImg, mainRacerImg1, mainRacerImg2;
var player1, player2, player3;

var restart;
var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0;

function preload() {
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png", "images/mainPlayer2.png")
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");

  oppPink1Img = loadAnimation("opponents/opponent1.png", "opponents/opponent2.png");
  oppPink2Img = loadAnimation("opponents/opponent3.png")
  oppYellow1Img = loadAnimation("opponents/opponent4.png", "opponents/opponent5.png");
  oppYellow2Img = loadAnimation("opponents/opponent6.png")
  oppRed1Img = loadAnimation("opponents/opponent7.png");
  oppRed2Img = loadAnimation("opponents/opponent9.png")

  gameOverImg = loadImage("images/gameOver.png");
  obstacle1 = loadImage("obstacles/obstacle1.png");
  obstacle2 = loadImage("obstacles/obstacle2.png");
  obstacle3 = loadImage("obstacles/obstacle3.png");
  bellsound = loadSound("sound/bell.mp3")
}

function setup() {

  createCanvas(700, 300);

  // Moving background
  path = createSprite(100, 150);
  path.addImage(pathImg);
  path.velocityX = -5;

  //creating boy running
  mainCyclist = createSprite(70, 150, 20, 20);
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
  mainCyclist.scale = 0.07;

  gameOver = createSprite(250, 150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.9;


  pinkCgroup = new Group();
  yellowCgroup = new Group();
  redCgroup = new Group();



}

function draw() {
  background(0);

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: " + distance, 350, 30);

  if (gameState === PLAY) {

    distance = distance + Math.round(getFrameRate() / 50);
    path.velocityX = -(5 + 4 * distance / 50)

    mainCyclist.y = World.mouseY;

    edges = createEdgeSprites();
    mainCyclist.collide(edges);
    gameOver.visible = false;

    //code to reset the background
    if (path.x < 0) {
      path.x = width / 2;
    }
    if (mousePressedOver(mainCyclist)) {
      bellsound.play();
    }
    select_oppPlayer = Math.round(random(1, 3));

    if (World.frameCount % 150 === 0) {

      if (select_oppPlayer === 1) {
        pinkCycles();
      } else if (select_oppPlayer === 2) {
        yellowCycles();
      } else {
        //redCycles();
      }
    }
    if (pinkCgroup.isTouching(mainCyclist)) {
      gameState = END;
      player1.velocityX = 0;
      player1.changeAnimation("Playr1", oppPink2Img)
    }

    if (yellowCgroup.isTouching(mainCyclist)) {
      gameState = END
      player2.velocityX = 0;
      player2.changeAnimation("Playr2", oppYellow2Img)
    }

    if (redCgroup.isTouching(mainCyclist)) {
      gameState = END;
      player3.velocityX = 0;
      player2.changeAnimation("Playr3", oppRed2Img)
    }
  }
  if (gameState === END) {
    gameOver.visible = true;
    textSize(20);
    text("Press the space bar to Restart the game!", 150, 200)

    path.velocityX = 0;
    mainCyclist.velocityX = 0;

    pinkCgroup.setVelocityXEach(0);
    pinkCgroup.setLifetimeEach(-1);

    yellowCgroup.setVelocityXEach(0);
    pinkCgroup.setLifetimeEach(-1);

    redCgroup.setVelocityXEach(0);
    pinkCgroup.setLifetimeEach(-1);

    if (keyWentDown("SPACE")) {
      reset();
    }
  }
}

function pinkCycles() {
  player1 = createSprite(700, Math.round(random(50, 250)));
  player1.addAnimation("jumping", oppPink1Img)
  player1.scale = 0.06;
  player1.velocityX = -(5 + 2 * distance / 150)
  player1.setLifetime = 170;
  pinkCgroup.add(player1);
}

function yellowCycles() {
  player2 = createSprite(700, Math.round(random(50, 250)))
  player2.addAnimation("running", oppYellow1Img)
  player2.scale = 0.10;
  player2.velocityX = -(6 + 2 * distance / 150);
  player2.setLifetime = 170;
  yellowCgroup.add(player2);
}

function redCycles() {
  player3 = createSprite(700, Math.round(random(50, 250)));
  player3.scale = 0.06;
  player3.velocityX = -(6 + 2 * distance / 150);
  player3.addAnimation("play", oppRed1Img)
  player3.setLifetime = 170;
  redCgroup.add(player3);
}

function reset() {
  gameState = PLAY
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1);

  distance = 0

}