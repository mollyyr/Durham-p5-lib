# Comp1101 Summative 
## _'Coloured Rectangle'_
--------------

## Introduction
#### This code creates a colour changing rectangle, controlled by the user's mouse movements. Through DOM interactivity, such as buttons, the user is able to control other aspects of the code, such as the Javascript or HTML canvases. It is encouraged to use the Google Chrome browser to run this program (via the HTML file).
-------------

## Javascript Code
### _Using p5.js_ 
#### The original code can be found at https://www.openprocessing.org/sketch/400636

### Setup Function
The first part of the JS code sets up variables to be used throughout the project and begins the p5.js setup function to draw the canvas. 

                var canvas;
                var r, b, g;
                var rs, gs, bs;

                function setup(){
                canvas = createCanvas(900, 480);

Next in the function, three sliders are created which control the colour that fill the rectangle. These sliders are given a position and an initial (grey) value on the page. These lines of code were inspired by the p5.js example page: https://p5js.org/examples/dom-slider.html

                rSlider = createSlider(0, 255, 100);
                rSlider.position(20, 20);
                gSlider = createSlider(0, 255, 100);
                gSlider.position(20, 50);
                bSlider = createSlider(0, 255, 100);
                bSlider.position(20, 80); 

The next part of the setup function draws the rectangle and fills it with the above colours, taken from the slider position. It also draws a very pale grey outline using the `stroke()` functions. In rgb format these initial colours are always 100, 100, 100 for the fill and 250, 250, 250 for the outline. It also creates a rectangle initially centred in the page, using the `rectMode()` function.

                rectMode(CENTER);
                fill(rSlider.value(), gSlider.value(), bSlider.value())
                stroke(250, 250, 250);
                strokeWeight(4);
            
The final section of the setup code simply chooses a random colour, using three random number generators (from 0 - 255) to generate the rgb value of the background.

                r = random(255);
                g = random(255);
                b = random(255);

### Draw Function
The first part of the p5.js draw function ensures the colours of the background and the rectangle are what the user have chosen. In this case, this is the randomly generated rgb value of the background, and whatever rgb value the user has chosen via the sliders. These slider values are constantly updated every time the slider is moved.  

                draw(rs, gs, bs){
                 var rs = rSlider.value();
                 var gs = gSlider.value();
                 var bs = bSlider.value();
                 fill(rs, gs, bs);
                 background(r, g, b);

The next few parts of the code control the movement of the rectangle, which follows the user's mouse in a parabolic shape, tilting/shearing as it gets further from the centre (as shown by the tilt value below). Firstly some float values, such as `intervalX` and `intervalY` are defined, based on the x and y co-ordinates of the user's mouse on the canvas.

                translate(width / 2, height / 2);
                float; intervalX = map(mouseX, 0, width, 40, -40);
                float; intervalY = map(abs(mouseX - width / 2), 0, width / 2, 0, -20);
                float; tilt = map(mouseX, 0, width, -20, 20);

Next, control statements are used in the form of if statements. These control statements are carried out if the mouse position exceeds the limits of the canvas. The first if-statement stops any further movement of the rectangle of the mouse goes too far in the x-direction. The second if-statement returns the rectangle to the centre of the canvas if the mouse goes too far in the negative y-direction. This is so the rectangle isn't moving about while the user is selecting any of the HTML buttons based at the bottom of the screen. 

                if (mouseX > 900){
                    float; intervalX = map(width, 0, 900, -40, -40);
                    float; intervalY = map(abs(width - 900 / 2), 0, 900 / 2, 0, -20);
                    float; tilt = map(width, 0, width, -20, 20);
                }
                if (mouseY > 480){
                    float; intervalX = map(width, 0, 0, -40, -40);
                    float; intervalY = map(abs(height - 480 / 2), 0, 900 / 2, 0, -20);
                    float; tilt = map(width, 0, width, -20, 20);
                }

The next part of the function dictates the speed and direction which which the rectangle moves(eg whether it is a positively or negatively-shaped parabola, depending on the values of `num` or `i`). It also creates the `rhythm` value, allowing the rectangle to occasionally move vertically slightly (the rate of which also depending on the user's mouse position along the x-axis)

                int; num = 8;
                int; i = 9;  
                for(; i > 0; i--);
                float; rhythm = map(pow(abs(sin(frameCount * 0.03 - i * 0.3)), 50), 0, 1, 0, -50)
                    * map(abs(mouseX - width / 2), 0, width / 2, 0, 1)
                translate(intervalX * (i - num / 2.0), intervalY * (i - num / 2.0) + rhythm);

The final part of the code draws the rectangle itself, by calculating four vertices and joining them together using the p5.js `beginShape()` and `endShape()` functions. The temp value, defined earlier, allows for the scale of the rectangle to change. 

                float; rectX = 100 + (i * 2);
                float; rectY = 200 - (i * 2);
                beginShape()
                vertex(-rectX / temp, -rectY / temp + tilt);
                vertex(rectX / temp, -rectY / temp - tilt);
                vertex(rectX / temp, rectY / temp - tilt);
                vertex(-rectX / temp, rectY / temp + tilt);
                endShape(CLOSE);

---------------------

## HTML Code
The HTML code is used to ensure the smooth running of the javascript code (eg by including p5.js libraries) as well as allowing for DOM interaction. Part of this code also concentrates on object-oriented coding by tlycreating a class. 

Firstly, the HTML language is declared and all necessary character sets and libraries are downloaded. It also ensures the HTML code is linked to the javascript code.

                !DOCTYPE html>
                <html lang="">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Coloured Rectangle</title>
                    <script src="../p5.min.js"></script>
                    <script src="../addons/p5.dom.min.js"></script>
                    <script src="../addons/p5.sound.min.js"></script>
                    <script src="sketch.js"></script>

Next two font types are declared for later use - this sets a  sans-serif font family (so no Times New Roman!) and general positions, if necessary.

                <style> p {font-family: Arial, Helvetica, sans-serif; position: fixed; bottom: 80px;} </style>
                <style> label {font-family: Arial, Tahoma, sans-serif; position: fixed; left: 572px;
                font-size: x-small;}  </style>

Then five buttons are created and given ids (allowing them to be called for events later), as well as given positions.

                <button id="words" class = "button" style="position:fixed; bottom: 0px; left: 400px">surprise!</button>
                <button id="nowords" class = "button" style="position:fixed; bottom: 0px; left: 100px">no text</button>
                <button id="colour" class = "button" style="position:fixed; bottom: 0px; left: 200px">background colour</button>
                <button id="thing" class = "button" style="position:fixed; bottom: 0px; left: 300px">no background</button>
                <button id="instructions" class = "button" style="position:fixed; bottom: 0px;">instructions</button>

Following this, form control in the form of radio buttons are added. Once again, these are given names and positions and ids so they can be called for events. These are labelled for ease of use. 

                <form>
                    <input type="radio" name="fillcol" value="r1" id = r1 style="position:fixed; left: 550px; bottom: 20px"> </input>
                    <label for="r1"  style= "bottom: 22px"; >red</label>
                    <input type="radio" name="fillcol" value="b1" id = b1 style="position:fixed; left: 550px; bottom: 60px"> </input>
                    <label for="b1"  style= "bottom: 62px"; >blue</label>
                    <input type="radio" name="fillcol" value="g1" id = g1 style="position:fixed; left: 550px; bottom: 40px"> </input>
                    <label for="g1"  style= "bottom: 42px"; >green</label>
                </form>

The next section of code defines a Shape class, containing a method in which a circle is drawn when given x and y positions, a radius, and a colour with which to fill the circle. Code from https://www.w3schools.com/tags/canvas_arc.asp was used to understand how to call the HTML canvas and draw a circle on it (some of this code is included in the `drawcircle()` function). 

                class Shape{
                constructor(x,y,r,colour){
                    this.x=x;
                    this.y=y;
                    this.r=r;
                    this.colour=colour;
                }
                    drawcircle() {
                    var c = document.getElementById("myCanvas");
                    var ctx = c.getContext("2d");
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
                        ctx.fillStyle = this.colour;
                        ctx.fill();
                    }
                }

This class allows many cirles to be drawn easily, in different positions and with different colours, and is called in the `EventListener` for the radio buttons. For example, the red radio button created three circles of different colours, and sets the p5.js canvas to red. The `EventListener` calls the function to do this when the radio button is clicked.

                document.getElementById("r1").addEventListener("click", function(){
                    c1 = new Shape(30,30,20,"#FF0000");
                    c1.drawcircle();
                    c2 = new Shape(125,150, 20,"#FF02B0");
                    c2.drawcircle();
                    c3 = new Shape(50,250, 20, "#FFA410");
                    c3.drawcircle();
                    get; r;
                    get; g;
                    get; b;
                    set; r = 255;
                    set; g = 0;
                    set; b = 0;
                });

This is repeated for both the green and blue radio buttons, with circles in different places and colours, as well as changing the background to green and blue, respectively. 
The next three `EventListener` functions are connected to three of the HTML buttons which control text. The first two create a line of text, and the third removes any and all text remaining  - all three using the innerHTML function.

                document.getElementById("words").addEventListener("click", function(){
                document.getElementById("demo").innerHTML = ("this is a feature not a bug") ;});

                document.getElementById("instructions").addEventListener("click", function(){
                document.getElementById("demo").innerHTML = ("Use the sliders to change the colour of the rectangle. Use the buttons to change background colour.") ;});

                document.getElementById("nowords").addEventListener("click", function(){
                document.getElementById("demo").innerHTML = ("") ;});

The `"demo"` id ensures that this text uses the preset `<p>` text style from earlier in the code. 
The remaining two EventListeners call two functions affecting the background of the p5.js canvas. The first gets a new rgb value for the background when the button is clicked, and the second not only clears the background when clicked (by getting and setting the colour to white) but also clears the HMTL canvas containing circles. This is the last block of code inside the `<script>`.  

            document.getElementById("colour").addEventListener("click", function(){
                get; r = random(255);
                get; g = random(255);
                get; b = random(255);});
            
            
            document.getElementById("thing").addEventListener("click", function(){
                var c = document.getElementById("myCanvas");
                var ctx = c.getContext("2d");
                ctx.clearRect(0,0,150,300);
                get; r;
                get; g;
                get; b;
                set; r = 255;
                set; g = 255;
                set; b = 255;

To improve the aesthetics of this project, the next line of code links to an CSS document to allow the size and colour of the buttons to be changed. 

            <link rel="stylesheet" type="text/css" href="mystyle.css">

The last piece of script code in the HTML document creates some text in the HTML canvas, giving the user something to do!

            <script>
                var canvas = document.getElementById("myCanvas");
                var ctx = canvas.getContext("2d")
                ctx.font = "10px Arial";
                ctx.fillText("See if you can match the", 10, 315);
                ctx.fillText("rectangle colour to any of", 10, 330);
                ctx.fillText("these circles!", 10, 345);
            </script> 
        
Finally, an image and link for Creative Commons is included in the botom right corner to ensure any user is aware of the licensing of the code. 

            <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/" style="position:fixed; left: 800px; bottom: 60px">
            <img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/3.0/88x31.png" />
            </a>
            <p style="position:fixed; left: 800px; bottom: 40px" >This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike 3.0 Unported License</a></p>
            </body>
            </html>

---------------------

## CSS Code
The Cascading Style Sheet is used to design the HTML buttons so they aren't the default buttons shown on an HTML webpage. The first section creates the button itself:

            .button {
                background-color: #3fe4ce;
                border-style: solid;
                border-color: white;
                border-width: 5px;
                color:whitesmoke;
                position: relative;
                width: 104px;
                height: 64px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
            }

This creates the button colour, outline and fill, using both preset colours and hexcode colours. It also specifies the size (width and height) of each button along with the text size and alignment inside. This code describes the buttons' default state. 
The final two lines of code allow the user to see when they have successfully interacted with a button due to a colour change. `.button:hover{}` changes the button colour when the mouse pans over the button and `.button:active{}` changes the colour of the button as it is clicked. This is a commonly used practise in websites and programs as it makes it clear to the user that they have clicked the button. 

            .button:hover {background-color: #a9d8d2}
            .button:active {background-color: #c4faf3}

--------------

I would like to give credit to the original author of this code, @aadebdeb on openprocessing.org 