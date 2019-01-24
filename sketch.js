/**
* boards in line
*
* @author aadebdeb
* @date 2017/01/26
*/
//credit to the above author on openprocessing.org
//edited by tqch55

//setting variables to allow them to be called in html
var canvas;
var r, b, g;
var rs, gs, bs;

function setup(){
  canvas = createCanvas(900, 480);
  //slider set up taken from example link below
  //creates sliders and positions
  //https://p5js.org/examples/dom-slider.html
  rSlider = createSlider(0, 255, 100);
  rSlider.position(20, 20);
  gSlider = createSlider(0, 255, 100);
  gSlider.position(20, 50);
  bSlider = createSlider(0, 255, 100);
  bSlider.position(20, 80); 
  //text describes colour each slider is in control of
  //setup for rectangle: centred in cavas and sets colours of fill and outline
  rectMode(CENTER);
  fill(rSlider.value(), gSlider.value(), bSlider.value())
  stroke(250, 250, 250);
  strokeWeight(4);
  // Pick a set of random colours, to later be set as background
  r = random(255);
  g = random(255);
  b = random(255);
}

  function draw(rs, gs, bs){
    //sets fill colour of rectangle to colours from slider
    var rs = rSlider.value();
    var gs = gSlider.value();
    var bs = bSlider.value();
    fill(rs, gs, bs);
    //sets background colour to randomly chosen colour
    background(r, g, b);
  
    //function controls movement and proportions of rectangle relative to mouse position on canvas
    float; temp = 2.0;
    translate(width / 2, height / 2);
      float; intervalX = map(mouseX, 0, width, 40, -40);
      float; intervalY = map(abs(mouseX - width / 2), 0, width / 2, 0, -20);
      float; tilt = map(mouseX, 0, width, -20, 20);
      //stops movement of rectangle if mouse exits canvas limit
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
      //controls movement direction and speed of rectangle
      int; num = 8;
      int; i = 9;  
      for(; i > 0; i--);
        float; rhythm = map(pow(abs(sin(frameCount * 0.03 - i * 0.3)), 50), 0, 1, 0, -50)
              * map(abs(mouseX - width / 2), 0, width / 2, 0, 1)
        translate(intervalX * (i - num / 2.0), intervalY * (i - num / 2.0) + rhythm);
        float; rectX = 100 + (i * 2);
        float; rectY = 200 - (i * 2);
        //draws rectangle
          beginShape()
          vertex(-rectX / temp, -rectY / temp + tilt);
          vertex(rectX / temp, -rectY / temp - tilt);
          vertex(rectX / temp, rectY / temp - tilt);
          vertex(-rectX / temp, rectY / temp + tilt);
          endShape(CLOSE);
        }