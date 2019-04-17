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

        var shape = new Triangle(shader, x, y, size);
        this.scene.addGeometry(shape);
    }

}
