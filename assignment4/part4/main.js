/*
	Name: Milan Patel
	File: Part-1
	Date: 2024-03-25
	Description: Java Script file.
	*/
// Set up canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Function to generate random number
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}
// Shape class
class Shape {
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
}

// Ball class
class Ball extends Shape {
    constructor(x, y, velX, velY, size, color) {
        super(x, y, velX, velY);
        this.size = size;
        this.color = color;
        this.exists = true;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if (this.x + this.size >= width) {
            this.velX = -Math.abs(this.velX);
        }

        if (this.x - this.size <= 0) {
            this.velX = Math.abs(this.velX);
        }

        if (this.y + this.size >= height) {
            this.velY = -Math.abs(this.velY);
        }

        if (this.y - this.size <= 0) {
            this.velY = Math.abs(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (const ball of balls) {
            if (ball !== this && ball.exists) {
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

// EvilCircle class
class EvilCircle extends Shape {
    constructor(x, y) {
        super(x, y, 20, 20);
        this.color = "white";
        this.size = 10;
        this.setControls();
    }

    draw() {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    checkBounds() {
        if (this.x + this.size >= width || this.x - this.size <= 0) {
            this.x -= this.velX;
        }

        if (this.y + this.size >= height || this.y - this.size <= 0) {
            this.y -= this.velY;
        }
    }

    setControls() {
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "a":
                    this.x -= this.velX;
                    break;
                case "d":
                    this.x += this.velX;
                    break;
                case "w":
                    this.y -= this.velY;
                    break;
                case "s":
                    this.y += this.velY;
                    break;
            }
        });
    }

    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if (balls[j].exists) {
                let dx = this.x - balls[j].x;
                let dy = this.y - balls[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + balls[j].size) {
                    balls[j].exists = false;
                    count--;
                }
            }
        }
    }
}

const balls = [];
let count = 0; // Ball count

// Loop to create balls
while (balls.length < 25) {
    const size = random(10, 20);
    const ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        size,
        randomRGB()
    );

    balls.push(ball);
    count++; // Increment ball count
}

const evilCircle = new EvilCircle(random(0, width), random(0, height));

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        if (ball.exists) {
            ball.draw();
            ball.update();
            ball.collisionDetect();
        }
    }

    evilCircle.draw();
    evilCircle.checkBounds();
    evilCircle.collisionDetect();

    requestAnimationFrame(loop);
}

loop();