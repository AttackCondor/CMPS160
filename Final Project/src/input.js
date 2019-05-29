var _inputHandler = null;

/**
 * Specifies a Input Handler. Used to parse input events from a HTML page.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */
class InputHandler {
  /**
   * Initializes the event handeling functions within the program.
   */
  constructor(canvas, scene) {
    this.canvas = canvas;
    this.scene = scene;

    _inputHandler = this;

    this.image = null;

    // Mouse Events
    this.canvas.onmousedown = function(ev) { this.mouseheld = true; _inputHandler.click(ev);};
    this.canvas.onmouseup   = function() { this.mouseheld = false;};
    this.canvas.onmousemove = function(ev) { if(this.mouseheld){_inputHandler.click(ev)} };

    //button events
    document.getElementById("clear").onclick = function() { _inputHandler.scene.clearGeometries();};

  }

  /**
   * Function called upon mouse click.
   */
  click(ev) {
    // Print x,y coordinates.
    console.log(ev.clientX, ev.clientY);
    //Convert coordinates to webgl style
     var x = (ev.clientX - (canvas.height/2))/(canvas.height/2);
     var y = ((canvas.height/2) - ev.clientY)/(canvas.height/2);

     var size = (document.getElementById("Size").value)/100;
     var red = document.getElementById("Red").value;
     var green = document.getElementById("Green").value;
     var blue = document.getElementById("Blue").value;
     var segments = document.getElementById("Segments").value;
     var color = [red, green, blue];
     if(document.getElementById("colorType").value == "Rainbow!") color = null;

     if(document.getElementById("spinsquare").checked){
       var shape = new Square(shader2, x, y, size, color);
     }
     else if(document.getElementById("fluctriangle").checked){
       var shape = new Triangle(shader2, x, y, size, color);
     }
     else if(document.getElementById("randcircle").checked){
       var shape = new Circle(shader2, x, y, size, color, segments);
    }
    else if(document.getElementById("tiltcube").checked && !this.image){
      var shape = new Cube(shader2, x, y, size, color);
   }
   else if(document.getElementById("tiltcube").checked){
    var shape = new TexCube(shader, x, y, size, this.image);
 }
    this.scene.addGeometry(shape);
  }


}

