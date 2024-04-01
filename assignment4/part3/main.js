/*
    Name: Milan Patel
    File: Part-1
    Date: 2024-03-25
    Description: JavaScript file.
*/

// Get canvas element and context
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions to match window size
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Function to generate random number between min and max
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate random RGB color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Ball class definition
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  // Method to draw the ball
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Method to update ball position
  update() {
    // Bounce off edges
    if (this.x + this.size >= width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }
    if (this.y + this.size >= height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }
    // Move the ball
    this.x += this.velX;
    this.y += this.velY;
  }

  // Method to detect collision with other balls
  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// Array to store balls
const balls = [];

// Generate random balls
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );
  balls.push(ball);
}

// Animation loop
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)"; // Semi-transparent background to create trails
  ctx.fillRect(0, 0, width, height); // Clear canvas

  // Update and draw each ball
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop); // Request next animation frame
}

loop(); // Start animation loop
