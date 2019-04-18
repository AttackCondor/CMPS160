var _inputHandler = null;

/**
 * Specifies a Input Handler. Used to parse input events from a HTML page.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */
class InputHandler {
    /**
     * Initializes the event handling functions within the program.
     */
    constructor(canvas, scene) {
      this.canvas = canvas;
      this.scene = scene;

      _inputHandler = this;

      // Mouse Events
      this.canvas.onmousedown = function(ev) { _inputHandler.click(ev) };
      document.getElementById("clear").onclick = function() { _inputHandler.scene.clearGeometries();};
    }

    /**
     * Function called upon mouse click.
     */
    click(ev) {
        // Print x,y coordinates.
        console.log(ev.clientX, ev.clientY);
        var x = (ev.clientX - (canvas.height/2))/(canvas.height/2);
        var y = ((canvas.height/2) - ev.clientY)/(canvas.height/2);
        var size = (document.getElementById("Size").value)/100;
        var red = document.getElementById("Red").value;
        var green = document.getElementById("Green").value;
        var blue = document.getElementById("Blue").value;
        var segments = document.getElementById("Segments").value;
        var color = [red, green, blue];

        if(document.getElementById("triangle").checked){
          var shape = new Triangle(shader, x, y, size, color);
        }
        else if(document.getElementById("square").checked){
          var shape = new Square(shader, x, y, size, color);
        }
        else if(document.getElementById("circle").checked){
          var shape = new Circle(shader, x, y, size, color, segments);
        }
        this.scene.addGeometry(shape);
    }

}
