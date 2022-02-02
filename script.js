let canvas = document.querySelector("#snake");
let context = canvas.getContext("2d");
let box = 32;
const up = document.querySelector(".up");
const down = document.querySelector(".down");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
let direction = "right";
let placar = 0;
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};
function criarBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarSnake() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}
function criaFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", tecla);
function tecla(e) {
  if (e.keyCode == 37 && direction != "right") direction = "left";
  if (e.keyCode == 38 && direction != "down") direction = "up";
  if (e.keyCode == 39 && direction != "left") direction = "right";
  if (e.keyCode == 40 && direction != "up") direction = "down";
}
function loop() {
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0 * box;
  if (snake[0].x < 0 * box && direction == "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0 * box;
  if (snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box;
}
function gameOver() {
  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo);
      alert(`Game Over! Sua pontuação foi: ${placar} pontos.`);
    }
  }
}

document.addEventListener("click", gameToutch);
function gameToutch(e) {
  let el = e.target;
  if (el.matches(".up") && direction != "down") direction = "up";
  if (el.matches(".down") && direction != "up") direction = "down";
  if (el.matches(".left") && direction != "right") direction = "left";
  if (el.matches(".right") && direction != "left") direction = "right";
}

function iniciarJogo() {
  loop();
  gameOver();
  criarBG();
  criaFood();
  criarSnake();
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    placar++;
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }
  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 150);
