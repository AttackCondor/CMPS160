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
      this.canvas.onmousedown = function(ev) { this.mouseheld = true; _inputHandler.click(ev);};
      this.canvas.onmouseup   = function() { this.mouseheld = false;};
      this.canvas.onmousemove = function(ev) { if(this.mouseheld){_inputHandler.click(ev)} };
      document.getElementById("clear").onclick = function() { console.log("Clearing");  _inputHandler.scene.clearGeometries();};
      document.getElementById('fileLoad').onclick = function() { _inputHandler.readSelectedFile() };

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

         if(document.getElementById("spinsquare").checked){
           var shape = new Square(shader, x, y, size, color);
         }
         else if(document.getElementById("fluctriangle").checked){
           var shape = new Triangle(shader, x, y, size, color);
         }
         else if(document.getElementById("randcircle").checked){
           var shape = new Circle(shader, x, y, size, color, segments);
        }
        else if(document.getElementById("tiltcube").checked){
          var shape = new Cube(shader, x, y, size, color);
       }
        this.scene.addGeometry(shape);
      
    }

    /**
     * Function called to read a selected file.
     */
    readSelectedFile() {
        var fileReader = new FileReader();
        var objFile = document.getElementById("fileInput").files[0];

        if (!objFile) {
            alert("OBJ file not set!");
            return;
        }

        fileReader.readAsText(objFile);
        fileReader.onloadend = function() {
            alert(fileReader.result);
            var customObj = new CustomOBJ(shader, fileReader.result);
            _inputHandler.scene.addGeometry(customObj);
        }
    }
}
