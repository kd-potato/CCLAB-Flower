var bgMusic;
var bufferSound;

var particle;
var platform;
var flower;
var windmill;
var plains;

let sceneIndex = 0;
let poseNet;
let pose;

var mic;

let windmillCheck = true;
let introCheck = true;
let act2Check = true;
let bufferCheck = true;

function preload() {
  soundFormats('ogg', 'mp3');
  bgMusic = loadSound('sound/wind.mp3');
  bufferSound = loadSound('sound/buffer.mp3');

  sky = loadImage('image/sky.jpg');
  wind = loadImage('image/wind.jpg');
  rose = loadImage('image/rose.png');

}

function setup() {
  createCanvas(900, 600);

  particle = new Particle(639, 0);
  particle2 = new Particle(0, 300);
  platform = new Platform(450, 400, 400, 100);
  flower = new Flower(particle.x, platform.y - particle.h / 2);
  windmill = new Windmill(0, 0);
  plains = new Plains();

  mic = new p5.AudioIn();
  mic.start();

  textAlign(CENTER, CENTER);

  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses)


}
function gotPoses(poses) {
  // console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function modelLoaded() {
  // console.log('poseNet ready')
}

function draw() {
  // image(video, 0, 0)
  // drawIntro();
  // drawAct1()
  // drawAct2()
  // drawAct3()
  // drawAct4()
  // drawSceneBuffer()

  if (sceneIndex === 0) {
    drawIntro();
  } else if (sceneIndex === 1) {
    drawSceneBuffer()
  } else if (sceneIndex === 2) {
    bufferCheck = true;
    drawAct1();
  } else if (sceneIndex === 3) {
    drawSceneBuffer()
  } else if (sceneIndex === 4) {
    bufferCheck = true;
    drawAct2();
  } else if (sceneIndex === 5) {
    drawAct4();
  }

  // image(video, 0, 0)
  // if (pose) {
  //   fill(255, 0, 0);
  //   ellipse(pose.nose.x, pose.nose.y, 64)
  // } 
}

function nextScene() {
  sceneIndex++;
} 

function drawIntro() {
  background(87, 193, 222);
  particle.show();
  particle.update();
  platform.show();
  particle.particleText();

  if (particle.intersects(platform) && introCheck) {
    particle.ySpeed = 0
    let vec = createVector(particle.x, platform.y - platform.h / 2)
    setTimeout(drawFlower, 1000);
    setTimeout(nextScene, 3000);
    introCheck = false;
  }
  console.log(sceneIndex);
}

function drawFlower() {
  let vec = createVector(particle.x, platform.y - platform.h / 2)
  flower.update(vec);
}

function drawAct1() {
  image(wind, 0, 0, width, height) // background

  rot = windmill.speed * frameCount;
  var micLevel = mic.getLevel();

  if (micLevel > 0.02) {
    windmill.speed += 0.01;
  }

  windmill.windText();

  rectMode(CENTER);

  rotateAbout(radians(rot), width / 2, height / 2);
  noFill();
  rect(windmill.x, windmill.y, 200, 200);
  pop()
  push()
  noFill();
  rotateAbout(radians(-rot), width / 2, height / 2);
  rect(windmill.x, windmill.y, 200, 200);

  if ((windmill.speed > 4.5)) {
    windmillCheck = false;
    micLevel = 0;
    windmill.speed += 0.00;
    setTimeout(nextScene, 3000);
    windmillCheck = false;
  }

  if (!windmillCheck) {
    windmill.speed = 4.0;
  }

  fill('black')
  circle(windmill.x, windmill.y, 40)

  console.log("windmillCheck: " + windmillCheck)
  console.log(windmill.speed)
  console.log(sceneIndex);
}

function drawAct2() { // flying
  image(sky, 0, 0, width, height)
  playAudio(bgMusic)
  bgMusic.setVolume(0.2);

  particle2.show2();
  particle2.update2();
  particle.particleText2();

  if (particle2.x > 1500 && act2Check) {
    nextScene();
    bgMusic.stop()
    act2Check = false;
  }

  console.log(particle2.x)
  console.log(sceneIndex)
}

function drawAct4() { // new plant
  colorMode(RGB)
  background(87, 193, 222)

  plains.show();
  plains.drawRose();

  console.log(sceneIndex);
}

function drawSceneBuffer() {
  background('black');
  if (bufferCheck) {
    bufferCheck = false;
    playAudio(bufferSound);
    setTimeout(nextScene, 600)
  }
  console.log(sceneIndex);
}

function rotateAbout(angle, x, y) {
  translate(x, y);
  rotate(angle);
  translate(-x, -y);
}

function playAudio(audio) {
  if (!audio.isPlaying()) {
    audio.play();
  }
  audio.setVolume(0.1);
}