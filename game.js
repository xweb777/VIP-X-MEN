const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Mario's properties
let mario = {
    x: 50,
    y: 400,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0,
};

// Gravity and jump
let gravity = 0.8;
let jumpPower = -15;
let isJumping = false;

function drawMario() {
    ctx.fillStyle = "#FF0000"; // Mario's color
    ctx.fillRect(mario.x, mario.y, mario.width, mario.height);
}

function updateGameArea() {
    if (isJumping) {
        mario.dy += gravity;
        mario.y += mario.dy;
        if (mario.y >= 400) {
            mario.y = 400;
            isJumping = false;
        }
    }

    mario.x += mario.dx;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawMario();
    requestAnimationFrame(updateGameArea);
}

function moveRight() {
    mario.dx = mario.speed;
}

function moveLeft() {
    mario.dx = -mario.speed;
}

function jump() {
    if (!isJumping) {
        mario.dy = jumpPower;
        isJumping = true;
    }
}

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "d") moveRight();
    if (e.key === "ArrowLeft" || e.key === "a") moveLeft();
    if (e.key === " " || e.key === "ArrowUp") jump();
});

window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "ArrowLeft" || e.key === "a") {
        mario.dx = 0;
    }
});

updateGameArea(); // Start the game loop