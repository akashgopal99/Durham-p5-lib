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
        let validInput = parseInt(size, 10);
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
        let validInput = parseInt(speed, 10);
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
            this._colour = 'R'
        }
        
    }

    //allows the user access to the value of the x co-ordinate of the circles
    get posX(){
        return this._posX;
    }

    //allows the user the ability to change the x co-ordinate of the circles
    set posX(posX = width / 2){
        let validInput = parseFloat(posX, 10)
        if(isNaN(validInput)){
            this._posX = width / 2
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
        let validInput = parseFloat(posY, 10)
        if(isNaN(validInput)){
            this._posY = height / 2
        } else{
            this._posY = validInput;    
        }  
    }
}