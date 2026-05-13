
"use strict";

// Global variables, defines game resolution
const canvasWidth = 800;
const canvasHeight = 600;

// Context of the Canvas, drawing tool
let ctx;

// Variable to store the game object
let game;

// Variable to store the time at the previous frame
let oldTime = 0;

// Global variables for the settings of the game
let initialSpeed = 0.5;
let ballSpeed = 0.5;
let paddleSpeed = 0.5;
let speedIncrease = 1.002; //how much the speed of the ball increases

// Class for the ball in the game
class Ball extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "ball", sheetCols);
        this.velocity = new Vector(0, 0); //ball starts not moving
    }
    //delta time is time between frames
    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(ballSpeed).times(deltaTime));
        this.updateCollider();
    }

    // Move the ball to the center, and stop its motion
    reset() {
        this.position.x = canvasWidth / 2;
        this.position.y = canvasHeight / 2;
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    // Start the ball motion, random angle between -45 degrees to 45 degrees
    serve() {
        let angle = Math.random() * Math.PI / 2 - Math.PI / 4;
        // Convets the angle into a vector, and scale it by the speed
        this.velocity = new Vector(Math.cos(angle), Math.sin(angle));
        if (Math.abs (this.velocity.y)<0.3) {
            this.velocity.y = 0.3 * Math.sign (this.velocity.y || 1);
        }
        ballSpeed = initialSpeed;

        // Select a random direction
        if (Math.random() > 0.5) {
            this.velocity.x *= -1;
        }
    }
}

// Class to create paddles in the game
class Paddle extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "paddle", sheetCols);
        this.velocity = new Vector(0, 0);

        // Structure with the directions the object can move
        this.motion = {
            left: {
                axis: "x",
                sign: -1,
            },
            right: {
                axis: "x",
                sign: 1,
            },
        }

        // Keys pressed to move the player
        this.keys = [];
    }

    update(deltaTime) {
        // Restart the velocity
        this.velocity.x = 0;
        this.velocity.y = 0;
        // Modify the velocity according to the directions pressed
        for (const direction of this.keys) {
            const axis = this.motion[direction].axis;
            const sign = this.motion[direction].sign;
            this.velocity[axis] += sign;
        }
        // Normalize the velocity to avoid greater speed on diagonals
        this.velocity = this.velocity.normalize().times(paddleSpeed);

        this.position = this.position.plus(this.velocity.times(deltaTime));

        this.clampWithinCanvas();

        this.updateCollider();
        
    }

    clampWithinCanvas() {
        // Top border
        if (this.position.y - this.halfSize.y < 0) {
            this.position.y = this.halfSize.y;
        }
        // Bottom border
        if (this.position.y + this.halfSize.y > canvasHeight) {
            this.position.y = canvasHeight - this.halfSize.y;
        }
        //Left border
        if (this.position.x - this.halfSize.x < 0) {
            this.position.x = this.halfSize.x;
        }
        //Right border
        if (this.position.x + this.halfSize.x > canvasWidth) {
            this.position.x = canvasWidth - this.halfSize.x;
        }
    }
}
//Class to create the bricks at the top of the screen for the character to destroy
//includes the method to draw the objtect and recognize when it's been destroyed 
class Brick extends GameObject {
    constructor (position, width, height, color) {
        super (position, width, height, color, "brick")
        this.active = true;
    }
    destroy () {
        this.active = false;
    }
    draw (ctx) {
        if (this.active) {
            super.draw (ctx);
        }
    }
}

// Class to keep track of all the events and objects in the game
//controls the levels, collisions, scores, game states, drawings and timers.
class Game {
    constructor() {
        this.createEventListeners();

        //background image file:
        this.background = new Image();
        this.background.src = "background.png";

        //game states:
        this.gameOver = false;
        this.playerWon = false;
        this.levelFinished = false;

        //starting variables
        this.level = 1;
        this.bricksDestroyed = 0;
        this.livesCounter = 100;

        this.initObjects();


        //Textlabels
        // TextLabels to display the number of lives left in the game
        this.lives_label_Counter = new TextLabel(20, 40,
                "30px Arial", "red");

        //Text label to display the level currently being played
         this.levelLabel = new TextLabel(canvasWidth - 150, 40,
                "30px Arial", "#ffe9a8");

        // Boolean to detect if the game is already in play
        this.inPlay = false;

        //7 minutes as a time limit, its in miliseconds
        this.timeRemaining = 420000;

        //Text label to display the timer during the game
        this.timeLabel = new TextLabel (20,canvasHeight -20, "25px Arial", "#ffe9a8");

        //label for brick counter (how many bricks/leaves have been destroyed)
        this.bricksLabel = new TextLabel (canvasWidth -250, canvasHeight -20, "25px Arial", "#ffe9a8");
        
    }

    // Create the objects in the game
    initObjects() {

        //Resets the counter of bricks/leaves destroyed
        this.bricksDestroyed = 0;
    
        // Sprites for paddle and ball
        this.paddle = new Paddle(new Vector(canvasWidth/2, canvasHeight/1.2), 120, 20, "green");
        this.paddle.setSprite ("hoja.png")
        // The ball
        this.ball = new Ball(new Vector(canvasWidth / 2, canvasHeight / 2), 40, 40, "black");
        this.ball.setCollider (18,18);
        this.ball.setSprite ("luciernaga.png");



        // The walls around the permiter
        this.wallTop = new Paddle(new Vector(canvasWidth / 2, 0), canvasWidth, 20, "#0c0b1c");
        this.wallBottom = new Paddle(new Vector(canvasWidth / 2, canvasHeight), canvasWidth, 20, "#ffe9a8");
        this.wallLeft = new Paddle(new Vector(0, canvasHeight / 2), 20, canvasHeight, "#0c0b1c");
        this.wallRight = new Paddle(new Vector(canvasWidth, canvasHeight / 2), 20, canvasHeight, "#0c0b1c");


        this.actors = [
            this.wallLeft,
            this.wallRight,
            this.wallTop,
            this.wallBottom,
            this.paddle,
            this.ball
        ];

        //Bricks configuration
        //Array that stores every brick
        this.bricks = [];
        //Determines the number of rows based on the level being played
        let rows = 3 + (this.level -1);
        //every row has 8 bricks
        let cols = 8;
        //size of bricks, spacing (so the bricks don't overlap) and where the first row starts vertically
        let brickWidth = 80;
        let brickHeight = 20;
        let spacing = 10;
        let startY = 60;
        let totalWidth = cols * brickWidth + (cols -1) * spacing;
        let startX = (canvasWidth - totalWidth)/2;

        //loop yo create rows and columns of bricks, like a grid
        //it also implements the sprite for each brick
        for (let row = 0; row < rows;row++ ) {
            for (let col = 0; col <cols ; col++) {
                let x = startX + brickWidth / 2 + col * (brickWidth + spacing);
                let y = startY + row * (brickHeight + spacing);
                let brick = new Brick ( new Vector (x, y), brickWidth, brickHeight, "green");
                brick.setSprite ("hoja.png")
                //pushes the bricks into the array
                this.bricks.push (brick);
                this.actors.push (brick);
            }
        }

        
    }
    //draws the objects in the canvas
    draw(ctx) {
        //draws the background
        ctx.drawImage (this.background, 0, 0, canvasWidth, canvasHeight);
        
        //Draws all the labels and counters
        this.lives_label_Counter.draw(ctx, "Lives " + this.livesCounter);
        this.levelLabel.draw (ctx, "Level " + this.level);
        let seconds = Math.ceil(this.timeRemaining / 1000);
        this.timeLabel.draw(ctx, "Time before sunrise (s): " + seconds);
        this.bricksLabel.draw ( ctx, "Leaves eaten: " + this.bricksDestroyed);

        for (let actor of this.actors) {
            actor.draw(ctx);
        }

        //draws different tittles deppending on the game results
        if (this.gameOver) {
            ctx.font = "60px Arial";
            ctx.fillStyle = "#ffe9a8";
            if (this.playerWon) {
                ctx.fillText ("YOU WIN!", canvasWidth/2-150, canvasHeight/2);
                ctx.font = "25px Arial";
                ctx.fillStyle = "orange";
                ctx.fillText("The firefly survived!", canvasWidth / 2 -120, canvasHeight / 2 + 50);
            }
            else {ctx.fillText ("GAME OVER", canvasWidth/2-170,canvasHeight/2)}
            if (!this.playerWon) {
            ctx.font = "25px Arial";
            ctx.fillStyle = "orange";
            ctx.fillText("You flew too close to the sun. The firefly died.", canvasWidth / 2 -250, canvasHeight / 2 + 50);
        }}
        if (this.levelFinished){
            ctx.font ="50px Arial";
            ctx.fillStyle = "yellow";
            if (this.level < 3) {
            ctx.fillText ("LEVEL ACCOMPLISHED", canvasWidth/2-250, canvasHeight/2) 
            }
        }
    }

    update(deltaTime) {
        if (this.gameOver) {
            return;
        }
        if (this.levelFinished){
            return;
        }
        this.timeRemaining -= deltaTime;
        if (this.timeRemaining <= 0) {
            this.timeRemaining = 0;
            this.gameOver = true;
        }
    

        // Move the paddles
        this.paddle.update(deltaTime);
        // Move the ball
        this.ball.update(deltaTime);

        // Detect collisions with the paddles
        if (boxOverlap(this.paddle, this.ball)) {
            this.ball.position.y = this.paddle.position.y -this.paddle.halfSize.y -this.ball.halfSize.y;
            this.ball.velocity.y *= -1;
            

            // Incremente the speed of the ball
            ballSpeed *= speedIncrease;
        }
        // Detect collisions with the walls
        if (boxOverlap(this.wallTop, this.ball)) {
            this.ball.velocity.y *= -1;
        }
        if (boxOverlap (this.wallRight, this.ball)|| boxOverlap(this.wallLeft, this.ball))
            {
            this.ball.velocity.x *= -1;
        }
        // Detect collisions with the light/bottom wall
        if (boxOverlap(this.wallBottom, this.ball)) {
            this.livesCounter -= 1;
            this.ball.reset();
            this.inPlay = false;
            if (this.livesCounter <= 0) {
                this.livesCounter = 0;
                this.gameOver = true;
            }
        }
        //Detect colisions with the bricks
        for (let brick of this.bricks) {
            if (brick.active && boxOverlap (brick, this.ball)) {
                brick.destroy();
                this.bricksDestroyed += 1;
                this.ball.velocity.y *= -1;
                ballSpeed *= speedIncrease;
                break;
            }
        }
        let allDestroyed = true;
        //checks if all bricks have been destroyed during the game
        for (let brick of this.bricks) {
            if (brick.active) {
            allDestroyed = false;
            break;
        }
    }
        //The conditions to pass to the next level
        if (allDestroyed && !this.levelFinished) {

            this.inPlay = false;

            this.ball.reset();

            this.levelFinished = true;

            setTimeout(() => {
                if (this.level >= 3) {
                    this.gameOver = true;
                    this.playerWon = true;
                }
                else {
                 this.level += 1; 
                 this.bricksDestroyed = 0;
                 this.levelFinished = false;
                 this.initObjects();
                }
        }, 2000);
}
      
    }

    createEventListeners() {
        //Keys to control the paddle
        window.addEventListener('keydown', (event) => {
            if (event.key == 'ArrowLeft') {
                this.addKey('left', this.paddle);
            } if (event.key == 'ArrowRight') {
                this.addKey('right', this.paddle);
            }

            // Get the ball in play
            if (event.key == ' ') {
                // Only if it is not alreay moving
                if (!this.inPlay && !this.gameOver) {
                    this.ball.serve();
                    this.inPlay = true;
                }
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == 'ArrowLeft') {
                this.delKey('left', this.paddle);
            } if (event.key == 'ArrowRight') {
                this.delKey('right', this.paddle);}
        });
    }

    // Add the key pressed to the 'keys' array of the object sent
    addKey(direction, object) {
        if (!object.keys.includes(direction)) {
            object.keys.push(direction);
        }
    }

    // Remove the key pressed from the 'keys' array of the object sent
    delKey(direction, object) {
        if (object.keys.includes(direction)) {
            object.keys.splice(object.keys.indexOf(direction), 1);
        }
    }
}


// Starting function that will be called from the HTML page
function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    // Create the game object
    game = new Game();

    drawScene(0);
}


// Main loop function to be called once per frame
function drawScene(newTime) {
    // Compute the time elapsed since the last frame, in milliseconds
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    game.update(deltaTime);

    game.draw(ctx);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
