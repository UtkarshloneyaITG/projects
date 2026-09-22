const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false;
// ctx.rect(0,0,5,5)

let x = canvas.width / 2 - 15
let y = canvas.height - 5
let ballX = x + 14
let bally = y - 1.5
let ballLaunch = false
let direction = "upRight"
let balls = 3
let point = 0
setInterval(() => {
  ctx.beginPath()
  ctx.fillStyle = "red"
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillRect(x, y, 30, 5)
  ctx.beginPath()
  ctx.font = "10px areal"
  ctx.fillText(`POINTS: ${point}`, canvas.width - 70, 10);

  if (ballLaunch) {
    if (ballX < 1 && direction == "upLeft") {
      direction = "upRight"
    }
    else if (ballX > canvas.width - 3 && direction == "upRight") {
      direction = "upLeft"
    }
    else if (bally < 2 && direction == "upRight") {
      direction = "downRight"
    }
    else if (bally < 2 && direction == "upLeft") {
      direction = "downLeft"
    }
    else if (ballX < 2 && direction == "downLeft") {
      direction = "downRight"
    }
    else if (ballX > canvas.width - 3 && direction == "downRight") {
      direction = "downLeft"
    }
    else if (
      (direction == "downRight" || direction == "downLeft") &&
      bally >= y - 2 &&
      bally <= y + 5 &&
      ballX >= x &&
      ballX <= x + 30
    ) {
      if (direction == "downRight") {
        direction = "upRight";
      }

      if (direction == "downLeft") {
        direction = "upLeft";
      }
      point+= 10
    }
    else if (bally > canvas.height && balls) {
      balls--
      ballLaunch = false
    }
    if (direction == "upRight") {
      ballX += 0.3
      bally -= 0.3
    }
    if (direction == "upLeft") {
      ballX -= 0.3
      bally -= 0.3
    }
    // if (direction == "downRight") {
    //   ballX += 0.3
    //   bally -=0.3
    // }
    if (direction == "downLeft") {
      ballX -= 0.3
      bally += 0.3
    }
    if (direction == "downRight") {
      bally += 0.3
      ballX += 0.3
    }
  }
  else {
    ballX = x + 14
    bally = y - 1.5
    if (x > canvas.width / 2) {
      direction = "upRight"
    } else { direction = "upLeft" }
  }
  if (!balls) {
    ballLaunch = false
    ctx.font = "20px Arial";
    ctx.fillText(`game over`, canvas.width / 2 - 50, canvas.height / 2);
    return
  }
  for (let x = 1; x <= 3; x++) {
    ctx.beginPath()
    ctx.arc(5 * (x * 2), 5, 4, 0, 2 * Math.PI);
    if (balls + 1 > x)
      ctx.fillStyle = "white"
    else ctx.fillStyle = "gray"
    ctx.fill();
  }

  ctx.beginPath()
  ctx.arc(ballX, bally, 2, 0, 2 * Math.PI);
  ctx.fillStyle = "white"
  ctx.fill();

}, 1)

document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowLeft" && x > 0) {
    x -= 2
    return
  }
  if (e.key == "ArrowRight" && x < canvas.width-30) {
    x += 2
    return
  }
  if (e.key == "ArrowUp") {
    ballLaunch = true
  }
})