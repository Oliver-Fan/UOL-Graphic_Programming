// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;
var Composites = Matter.Composites;

var engine;
var propeller;
var boxes = [];
var birds = [];
var colors = [];
var ground;
var slingshotBird, slingshotConstraint;
var angle = 0;
var angleSpeed = 0;
var canvas;
//------- Bonus: seclapse to calculate remaining time for a game-----
var startTime;
var secLapse;

////////////////////////////////////////////////////////////
function setup() {
    canvas = createCanvas(1000, 600);

    engine = Engine.create(); // create an engine

    setupGround();

    setupPropeller();

    setupTower();

    setupSlingshot();

    setupMouseInteraction();

    startTime = new Date().getTime();
    textSize(40);
}
////////////////////////////////////////////////////////////
function draw() {
    background(0);

    Engine.update(engine);

    drawGround();

    drawPropeller();

    drawTower();

    drawBirds();

    drawSlingshot();

    //  secLapse part 
    fill(255, 140, 0);
    var now = new Date().getTime();
    var diff = now - startTime;
    secLapse = Math.floor(diff % (1000 * 60) / 1000);
    text("Time: " + secLapse, 10, 40);

    checkBoxes();

    checkGameOver();
}
////////////////////////////////////////////////////////////
//use arrow keys to control propeller
function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        //your code here
        angleSpeed += 0.05;
    } else if (keyCode == RIGHT_ARROW) {
        //your code here
        angleSpeed -= 0.05;
    }
}
////////////////////////////////////////////////////////////
function keyTyped() {
    //if 'b' create a new bird to use with propeller
    if (key === 'b') {
        setupBird();
    }

    //if 'r' reset the slingshot
    if (key === 'r') {
        removeFromWorld(slingshotBird);
        removeFromWorld(slingshotConstraint);
        setupSlingshot();
    }
    //-----refresh the page to restart game-----
    if (key === 'e') {
        location.reload();
    }
}

function checkBoxes() {
    for (var i = 0; i < boxes.bodies.length; i++) {
        if (isOffScreen(boxes.bodies[i])) {
            boxes.bodies.splice(i, 1);
            i--;
        }
    }
    // ---------Bonus: Game rule--Win--------
    if (boxes.bodies.length == 0) {
        textSize(80);
        fill(255, 255, 255);
        textAlign(CENTER, CENTER);
        text("YOU WIN!", width / 2, height / 2)
        noLoop()
    }
}
//-------Game rule: LOSE--------
function checkGameOver() {
    if (secLapse >= 60) {
        textSize(80);
        textAlign(CENTER, CENTER);
        text("GAME OVER", width / 2, height / 2)
        noLoop()
    }
}

//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased() {
    setTimeout(() => {
        slingshotConstraint.bodyB = null;
        slingshotConstraint.pointA = {
            x: 0,
            y: 0
        };
    }, 100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body) {
    var pos = body.position;
    return (pos.y > height || pos.x < 0 || pos.x > width);
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
    World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
    beginShape();
    for (var i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
    push();
    var offsetA = constraint.pointA;
    var posA = {
        x: 0,
        y: 0
    };
    if (constraint.bodyA) {
        posA = constraint.bodyA.position;
    }
    var offsetB = constraint.pointB;
    var posB = {
        x: 0,
        y: 0
    };
    if (constraint.bodyB) {
        posB = constraint.bodyB.position;
    }
    strokeWeight(5);
    stroke(255);
    line(
        posA.x + offsetA.x,
        posA.y + offsetA.y,
        posB.x + offsetB.x,
        posB.y + offsetB.y
    );
    pop();
}
