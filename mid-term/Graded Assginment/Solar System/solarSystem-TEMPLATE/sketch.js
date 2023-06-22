var speed;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
    speed = frameCount;

    /*——————————————————————————SUN————————————————————————————*/
    //spin in'speed/3'

    push();
    translate(width / 2, height / 2);
    rotate(radians(speed / 3));
    celestialObj(color(255, 150, 0), 200); // SUN
    pop();


    /*————————————————————Earth,follow the Sun——————————————————*/
    //blue,size 80,orbital 300 pixels
    //rotate around the Sun in 'speed'
    //spin in 'speed'
    //orbital should consider the affection of the celestial radius.

    push();
    translate(width / 2, height / 2);
    rotate(radians(speed));
    //translate from the Sun and rotate
    translate(width / 2 - 580, height / 2 - 580);
    rotate(radians(speed));
    celestialObj(color(0, 0, 255), 80);
    pop();

    /*————————————————————Moon,follow the Earth———————————————————*/
    //white,size 30 ,orbital 100 pixels
    //rotate in '-speed *2'
    //spin always show one face
    //orbital should consider the affection of celestial radius.

    push();
    //Moon, translate from the Sun
    translate(width / 2, height / 2);
    rotate(radians(speed));
    //Moon,translate from the Earth
    translate((width / 2) - 580, (height / 2) - 580);
    rotate(radians((-speed) * 2));
    //    Moon,translate and rotate
    translate((width / 2) - 370, (height / 2) - 370);
    rotate(radians((-speed) / 320));
    celestialObj(color(255, 255, 255), 30);
    pop();


    /*————————————————————————celestial around the earth;—————————————————*/
    //It is a little green planet turning around the Earth,
    //and it has a bigger oribital than the Moon as 
    //    it will pass the orbital between the Sun and the Earth. 
    //Unlike the Moon,this celestial rotating faster 
    //    but still always show one-face to the Earth.

    push();
    //celestial,translate from the Sun
    translate(width / 2, height / 2);
    rotate(radians(speed));
    //celestial,translate from the Earth
    translate((width / 2) - 580, (height / 2) - 580);
    rotate(radians((-speed) * 4));
    //celestial,translate and rotate
    translate(width / 2 - 320, height / 2 - 320);
    rotate(radians((-speed) / 160));
    celestialObj(color(0, 255, 0), 20);
    pop();

    /*—————————————————————————celestial around the moon——————————————————*/
    //    It is a small pink planet turning around the Moon,
    //    it has the smallest orbital as it will pass the place 
    //    between the Moon and the Earth without collision to other 
    //    celestials.

    push();
    //celestial, translate from the Sun
    translate(width / 2, height / 2);
    rotate(radians(speed));
    //celestial,translate from the Earth
    translate((width / 2) - 580, (height / 2) - 580);
    rotate(radians((-speed) * 2));
    //celestial,translate from the Moon
    translate((width / 2) - 370, (height / 2) - 370);
    rotate(radians((-speed) * 4));
    //celestial, translate and rotate
    translate((width / 32), (height / 32));
    rotate(radians(speed / 2));
    celestialObj(color(255, 100, 205), 15);
    pop();

}

function celestialObj(c, size) {
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size / 2, 0);
}
