const playBoard = document.querySelector(".play-board");
const controls = document.querySelectorAll(".controls i");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let createSnake, createFood;
let foodX, foodY;
let snakeX = 20, snakeY = 5;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let gameOver = false;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
highScoreElement.innerText = "High Score: " + highScore;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert('Game Over...');
    location.reload();
};

const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
};
controls.forEach(key=>{
        key.addEventListener("click",()=>changeDirection({key:key.dataset.key}));
    }
);

document.addEventListener("keydown", changeDirection);

const createSnakeElement = () => {
    if (gameOver) return handleGameOver();

    createFood = `<div class="food" style="background:red;grid-area:${foodY}/${foodX};"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            highScoreElement.innerText = "High Score: " + highScore;
        }
        scoreElement.innerText = "Score: " + score;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = [...snakeBody[i - 1]];
    }

    snakeBody[0] = [snakeX, snakeY];
    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 ||  snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    let snakeElements = '';
    for (let i = 0; i < snakeBody.length; i++) {
        snakeElements += `<div class="snake" style="background:green;grid-area:${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`;
        if (i !== 0 && snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
        }
    }

    playBoard.innerHTML = createFood + snakeElements;
};

changeFoodPosition();
setIntervalId = setInterval(createSnakeElement, 125);




