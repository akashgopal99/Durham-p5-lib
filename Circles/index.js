window.addEventListener("keydown", checkKeyPressed, false);

var shape;
var positionX;
var positionY;
var xOffset;
var yOffset;
var overCircle;
var locked;
var pg;

function setup(){
    createCanvas(windowWidth - 15, windowHeight);
    pg = createGraphics(200,200);
    resetSketch();
}

function resetSketch(){
    //resets all variables to clear the canvas
    colourScheme = 0;
    positionX = width / 2;
    positionY = height / 2;
    xOffset = 0;
    yOffset = 0;
    circleSize = 5;
    overCircle = false;
    locked = false;
    noFill();
    stroke(0);
    //sets form to have the appropriate values
    document.getElementById("myRed").checked = true;
    document.getElementById('mySize').value = '45';
    document.getElementById('mySpeed').value = '5';
    //intialises new circle object
    shape = new Circles(0,0,'R',positionX, positionY);
}

function setValues(){
    //takes the value of the sliders and boxes
    let sizeSlider = document.getElementById('mySize').value;
    let speedSlider = document.getElementById('mySpeed').value;
    let redCheck = document.getElementById("myRed").checked;
    let greenCheck = document.getElementById("myGreen").checked;
    let colour;
    //checks which colour has been selected
    if(redCheck){
        colour = 'R';
    }else if(greenCheck){
        colour = 'G';
    }else{
        colour = 'B';
    }
    //sets the user selected values to the attributes in the class
    shape.size = sizeSlider;
    shape.speed = speedSlider;
    shape.colour = colour;
}

function draw(){
    //checks if mouse is hovering over the circles
    if (mouseX > positionX - shape.size * 3 && mouseX < positionX + shape.size * 3 && 
        mouseY > positionY - shape.size * 3 && mouseY < positionY + shape.size * 3) {
        //sets value to allow the shape to dragged across the screen
        overCircle = true;
    } else{
        overCircle = false;
    }
    //when dragging the shape creates a shadow trail
    if(mouseIsPressed && overCircle){
        fill(243, 50);
        rect(0, 0, width, height);
        fill(255);
        noStroke();
        shape.draw();
        image(pg, 150, 75);
    } else{
        //if not being dragged normally displays shape
        background(243);
        shape.draw();
    }
}

//prevents the page from scrolling whilst over circle object
function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault){
        //reverse the current default
        //toggles scrolling on and off
        e.preventDefault();
    }
    e.returnValue = false;  
}

//using the scroll wheel to change the size of the shape
function mouseWheel(e){
    //locally takes the value, makes code more modular
    let scrollCircleSize = parseInt(shape.size, 10);
    //only works if hovering over circles
    if(overCircle){
        //prevents the page from being scrolled as the shape is resizing
        preventDefault(e);
        //changes the size depending on how much you scroll the wheel
        scrollCircleSize += -(e.delta/200);
        //minimum size of 5
        if(scrollCircleSize < 5){
            scrollCircleSize = 5;
        //maximum size proportional to size of the canvas
        } else if(scrollCircleSize > height / 7.5){
            scrollCircleSize = height / 7.5;
        }
        shape.size = scrollCircleSize;
        document.getElementById("mySize").value = scrollCircleSize.toString();
    }
}

function mousePressed(){
    if(overCircle){
        //allows the shape to be dragged as when the mouse was
        //pressed it was over the circles
        locked = true;
    } else{
        locked = false;
    }
    xOffset = mouseX - positionX; 
    yOffset = mouseY - positionY;   
}

function mouseDragged(){
    if(locked) {
        //changes the position of where the circles are drawn
        positionX = mouseX - xOffset; 
        positionY = mouseY - yOffset;
        shape.posX = positionX;
        shape.posY = positionY;
    }
}
  
function mouseReleased(){
    //prevents the circles from moving after the mouse click has been released
    locked = false;
}

function checkKeyPressed(e) {
    let colours = ['R', 'G', 'B'];
    let colourScheme = colours.indexOf(shape.colour);
    //checks if 'c' key is pressed and then changes the index
    //of the array of where the colours are stored
    //loops round if pressed more than the available colours
    if(e.keyCode == '67'){
        if(colourScheme == 2){
            colourScheme = -1;
        }
        colourScheme ++;
        shape.colour = colours[colourScheme];
        //changes the toggle on-screen for the colour to match the one selected
        if(colours[colourScheme] == 'R'){
            document.getElementById("myRed").checked = true;
        }else if(colours[colourScheme] == 'G'){
            document.getElementById("myGreen").checked = true;
        }else{
            document.getElementById("myBlue").checked = true;
        }
    } else if(e.keyCode == '88'){
        resetSketch();
    }
}

class Circles{

    constructor(size = 25, speed = 5, colour = 'R', posX = width / 2, posY = height / 2){
        //intialising variables
        this._size = size;
        this._speed = speed;
        this._colour = colour;
        this._posX = posX;
        this._posY = posY;
        this.time = 0;
        
    }

    draw(pg){
        for(let count = 0; count < 360; count +=3){
            //creating co-ordinates and size for rotating circle
            let x = Math.cos(count * Math.PI / 180) * this._size + this._posX;
            let y = Math.sin(count * Math.PI / 180) * this._size * 2 + this._posY;
            let z = Math.sin((this.time + count) * Math.PI / 180) * this._size * 4;

            //size of circle has to be a positive value
            z = abs(z);
            
            //creates the different colours on the rotating circles
            let col = map(count, 0, 360, 120, 255);
            fill(col, col, col);
    
            noStroke();

            //gradient determines the rate at which the colour changes
            //in comparison to the position on the page
            let gradient = (width / 2) / 255;

            //for the first half of the canvas one of the RGB values is decreased to zero
            if(this._posX < width / 2){
                switch(this._colour){
                    //different colours cases
                    case 'R':
                        fill(col, 255 - (this._posX / gradient), 255);
                        break;
                    case 'G':
                        fill(255, col, 255 - (this._posX / gradient));
                        break;
                    case 'B':
                        fill(255 - (this._posX / gradient), 255, col);
                        break;
                }
            //second half the other RGB value is decreased to zero
            } else{
                switch(this._colour){
                    //different colour cases
                    case 'R':
                        // (width / 2) used as past halfway point on the canvas
                        fill(col, 0, 255 - ((this._posX - (width / 2)) / gradient));
                        break;
                    case 'G':
                        fill(255 - ((this._posX - (width / 2)) / gradient), col, 0);
                        break;
                    case 'B':
                        fill(0, 255 - ((this._posX - (width / 2)) / gradient), col);
                        break;
                }
            }

            if(pg){
                pg.ellipse(x, y, z, z);
            } else{
                ellipse(x, y, z, z);  
            }
            
        }
        //controls the speed at which the circles rotate, the higher the number the faster the rotations
        this.time += this._speed;
    }

    //allows the user access to the value of the size of the circles
    get size(){
        return this._size;
    }

    //allows the user the ability to change the size of the circles
    set size(size = 25){
        let validInput = parseFloat(size, 10);
        if(isNaN(validInput)){
            this._size = 25;
        } else{
            this._size = validInput;
        }
    }

    //allows the user access to the value of the speed of rotation of the circles
    get speed(){
        return this._speed;
    }

    //allows the user the ability to change the speed of rotation of the circles
    set speed(speed = 5){
        this.time = 0;
        let validInput = parseFloat(speed, 10);
        if(isNaN(validInput)){
            this._speed = 5;
        } else{
            this._speed = validInput;
        }
    }

    //allows the user access to the value of the colour of the circles
    get colour(){
        return this._colour;
    }

    //allows the user the ability to change the colour of the circles
    set colour(colour = 'R'){
        if(colour == 'R' || colour == 'G' || colour == 'B'){
            this._colour = colour;
        } else{
            this._colour = 'R';
        }
        
    }

    //allows the user access to the value of the x co-ordinate of the circles
    get posX(){
        return this._posX;
    }

    //allows the user the ability to change the x co-ordinate of the circles
    set posX(posX = width / 2){
        let validInput = parseFloat(posX, 10);
        if(isNaN(validInput)){
            this._posX = width / 2;
        } else{
            this._posX = validInput;    
        }
    }

    //allows the user access to the value of the y co-ordinate of the circles
    get posY(){
        return this._posY;
    }

    //allows the user the ability to change the y co-ordinate of the circles
    set posY(posY = height / 2){
        let validInput = parseFloat(posY, 10);
        if(isNaN(validInput)){
            this._posY = height / 2;
        } else{
            this._posY = validInput;    
        }  
    }
}