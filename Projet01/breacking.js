//Structural Breacking Break GAME
var canvas = document.getElementById("canvas"); //
var ctx = canvas.getContext("2d");//
var ballRadius = 10;//
var x = canvas.width/2;//
var y = canvas.height-30;//
var dx = 2;//
var dy = -2;//
var paddleHeight = 10;//
var paddleWidth = 75;//
var paddleX = (canvas.width-paddleWidth)/2;//
var rightPressed = false;//
var leftPressed = false;//
var brickRowCount = 5;//
var brickColumnCount = 3;//
var brickWidth = 75;//
var brickHeight = 20;//
var brickPadding = 10;//
var brickOffsetTop = 30;//
var brickOffsetLeft = 30;//
var score = 0;//
var lives = 3;//
var bricks = [];//
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

//Event Key code [Right + Left + Mouse]
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
//Detect mouse for game
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}

//Detect breacking bricks for game
function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount) {
            alert("Vous avez Gagné ! Bravo");
            document.location.reload();
          }
        }
      }
    }
  }
}

//Structural ball for game
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#dd3b00";
  ctx.fill();
  ctx.closePath();
}

//Structural paddle for game
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#dd004a";
  ctx.fill();
  ctx.closePath();
}
//Structural bricks for game
function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0067dd";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
//Structural score for game
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#00dd51";
  ctx.fillText("Score: "+score, 8, 20);
}
//Structural score life for game
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#dd8500";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

//Structural draw + game over // requestAnimationFrame
function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      lives--;
      if(!lives) {
        alert("Vous avez Perdu ! Dommage");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();

