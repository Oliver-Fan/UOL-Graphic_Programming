var stepSize = 20;

function setup() {
    createCanvas(500, 500);
}
///////////////////////////////////////////////////////////////////////
function draw() {
    background(125);

    colorGrid();
    compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid() {
    // your code here
    var green = color(84, 255, 159);
    var red = color(255, 0, 0);

    noStroke();
    for (var i = 0; i < 25; i++) {
        for (var j = 0; j < 25; j++) {

            tilex = (i + frameCount) * 0.004 * (mouseX * 0.004);
            tiley = (j + frameCount) * 0.004 * (mouseX * 0.004);

            var n = noise(tilex, tiley);
            var colour = lerpColor(green, red, n);
            fill(colour);
            rect(i * stepSize, j * stepSize, stepSize, stepSize);
        }
    }
}
///////////////////////////////////////////////////////////////////////
function compassGrid() {
    // your code here
    var pink = color(255, 228, 225);
    var purple = color(230, 230, 250);

    strokeWeight(3);

    for (var i = 0; i < 25; i++) {
        for (var j = 0; j < 25; j++) {

            compassx = (i + frameCount) * 0.003 * (mouseX * 0.003);
            compassy = (j + frameCount) * 0.003 * (mouseX * 0.003);

            var n = noise(compassx, compassy);
            var lerpLine = lerpColor(pink, purple, n);
            var angle = map(n, 0, 1, 0, 720);

            //lerpLine
            push();

            stroke(lerpLine);
            translate(i * stepSize + stepSize / 2, j * stepSize);
            rotate(radians(angle));
            line(0, 10, 0, 20, stepSize + mouseX * 0.05);

            pop();


        }
    }

}
