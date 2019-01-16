# msqj93 Documentation

## Example

The example makes use of the Circles class by drawing it to the screen. It allows the user to make changes to certain parameters of the class which are size, colour and speed. The user alters these values by entering the details into the form provided and then confirming them. The user also has the ability to drag the shape across the screen and it will leave a sort of 'shadow' trail behind. The user is able to use the mouse scroll wheel to edit the size of the shape once it has already been drawn. By pressing the 'C' key the colour of the shape will change to one of the other available colours. Pressing the 'X' will clear the screen and reset the settings to their defaults. In the example the get and set methods as well as interaction with the HTML page elements, such as sliders, have been used to alter the values of size, speed and colour.

## Circles Class

### Fields

* <u>**_size**:</u>
This is stores the value for the size of the shape.
* <u>**_speed**:</u>
This stores the speed of rotation for the shape.
* <u>**_colour**:</u>* 
This stores the value for the colour mode of the shape.
* <u>**_posX**:</u>
This stores the x co-ordinate of the shape.
* <u>**_posY**:</u>
This stores the y co-ordinate of the shape.
* <u>**time**:</u>
This stores the variable relating to the 'time' the shape has been rotating. This means that it holds value which determines the point in the rotation the shape is.

### Methods

* <u>**constructor()**:</u>
This function takes 5 parameters which are the size of the shape, the speed the shape rotates, the colour of the shapes and the co-ordinates of the shape. It then uses these values and stores them in copies which can be accessed by the rest of the methods in the class.
* <u>**draw()**:</u> 
This function is responsible for the drawing of the actual shape. It creates co-ordinates depending on the 'time' the program has been running, which allows the rotation effect to happen. It also generates the graident effect for the shapes, which is dependent on the position the shape relative to the canvas. It uses the colour attribute set by user to determine the colour of the shapes. It also uses the speed attribute and size attribute to determine the speed and size of the shape respectively. It takes one optional parameter which is a p5 renderer. If it is passed to the function then it will draw the shape to a buffer.
* <u>**get size()**:</u>
This allows the user to access the size variable from the class.
* <u>**set size()**:</u>
This allows the user to set the size of the shape. It takes one parameter which it uses to modify the value. The function will only allow a valid input, a number, and if the parameter passed isn't one then it will assign a default value instead.
* <u>**get speed()**:</u>
This allows the user to access the speed variable from the class.
* <u>**set speed()**:</u>
This allows the user to set the speed of rotation of the shape. It takes one parameter which it uses to modify the value. The function will only allow a valid input, a number, and if the parameter passed isn't one then it will assign a default value instead.
* <u>**get colour()**:</u>
This allows the user to access the colour variable from the class.
* <u>**set colour()**:</u>
This allows the user to set the colour of the shape. It takes one parameter which it uses to modify the value. The function will only allow a valid input, the values 'R', 'G' or 'B', and if the parameter passed isn't one then it will assign a default value instead.
* <u>**get posX()**:</u>
This allows the user to access the variable which holds the x co-ordinate of the shape from the class.
* <u>**set posX()**:</u>
This allows the user to set the x co-ordinate of the shape. It takes one parameter which it uses to modify the value. The function will only allow a valid input, a number, and if the parameter passed isn't one then it will assign a default value instead.
* <u>**get posY()**:</u>
This allows the user to access the variable which holds the y co-ordinate of the shape from the class.
* <u>**set posY()**:</u>
This allows the user to set the y co-ordinate of the shape. It takes one parameter which it uses to modify the value. The function will only allow a valid input, a number, and if the parameter passed isn't one then it will assign a default value instead.
