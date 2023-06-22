////////////////////////////////////////////////////////////////
function setupGround() {
    ground = Bodies.rectangle(500, 600, 1000, 40, {
        isStatic: true,
        angle: 0
    });
    World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround() {
    push();
    fill(25, 25, 112);
    drawVertices(ground.vertices);
    pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller() {
    // your code here
    propeller = Bodies.rectangle(150, 480, 200, 15, {
        angle: angle
    });

    constraint = Constraint.create({
        bodyA: propeller,
        pointA: {
            x: 0,
            y: 0
        },
        pointB: {
            x: 200,
            y: 450
        },
        stiffness: 1,
        length: 0
    });

    World.add(engine.world, [propeller, constraint]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller() {
    push();
    // your code here
    propeller.angle = angle;
    propeller.angularvelocity = angleSpeed;
    angle += angleSpeed;
    drawVertices(propeller.vertices);
    pop();
}
////////////////////////////////////////////////////////////////
function setupBird() {
    var bird = Bodies.circle(mouseX, mouseY, 20, {
        friction: 0,
        restitution: 0.95
    });
    Matter.Body.setMass(bird, bird.mass * 10);
    World.add(engine.world, [bird]);
    birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds() {
    push();
    //your code here
    for (var i = 0; i < birds.length; i++) {
        drawVertices(birds[i].vertices);
        if (isOffScreen(birds[i])) {
            removeFromWorld(birds[i])
            birds.splice(i, 1);
            i--;
        }
    }
    pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower() {
    //create the tower using the callback function
    boxes = Composites.stack(500, 180, 3, 5, 0, 0, createOneTowerBrick);
    //loop through the boxes the fill in different green
    for (var i = 0; i < boxes.bodies.length; i++) {
        var g = random(0, 100);
        boxes.bodies[i].render.fillStyle = color(139, g, 40);
    }

    World.add(engine.world, [boxes]);
}

function createOneTowerBrick(x, y) {
    var brickStyle = {
        fillStyle: "brickred",
        strokeStyle: "black"
    };

    var body = Bodies.rectangle(x, y, 80, 80, {
        render: brickStyle
    });

    return body;
}

////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower() {
    push();
    //your code here
    for (var i = 0; i < boxes.bodies.length; i++) {
        fill(boxes.bodies[i].render.fillStyle);
        stroke(boxes.bodies[i].render.strokeStyle);
        drawVertices(boxes.bodies[i].vertices);
    }
    pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot() {
    //your code here
    slingshotBird = Bodies.circle(180, 180, 20, {
        restitution: 0.9,
        friction: 0,
        mass: 10
    })

    var constrain_prop = {
        pointA: {
            x: 200,
            y: 200
        },
        bodyB: slingshotBird,
        pointB: {
            x: 0,
            y: 0
        },
        stiffness: 0.01,
        damping: 0.0001
    };

    slingshotConstraint = Constraint.create(constrain_prop);

    World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot() {
    push();
    // your code here
    drawVertices(slingshotBird.vertices);
    drawConstraint(slingshotConstraint);
    pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction() {
    var mouse = Mouse.create(canvas.elt);
    var mouseParams = {
        mouse: mouse,
        constraint: {
            stiffness: 0.05
        }
    }
    mouseConstraint = MouseConstraint.create(engine, mouseParams);
    mouseConstraint.mouse.pixelRatio = pixelDensity();
    World.add(engine.world, mouseConstraint);
}
