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
    document.getElementById('fileLoad').onclick = function() { _inputHandler.readSelectedFile() };
    document.getElementById('texInput').onchange = function () { _inputHandler.readTexture() };
    document.getElementById("colorType").onclick = function() {_inputHandler.changeButton()};
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
    fileReader.onloadend = function () {
      alert(fileReader.result);
    }
  }

  readTexture() {
    // Create the image object
    var image = new Image();
    if (!image) {
      console.log('Failed to create the image object');
      return false;
    }

    // Register the event handler to be called on loading an image
    image.onload = function () {
      _inputHandler.image = image;
    };

    var imgPath = document.getElementById("texInput").value;
    var imgPathSplit = imgPath.split("\\");

    // Tell the browser to load an image
    image.src = 'objs/' + imgPathSplit[imgPathSplit.length - 1];
    return true;
  }

  changeButton(){
    if(document.getElementById("colorType").value == "Solid Color")
      document.getElementById("colorType").value = "Rainbow!";
    else
      document.getElementById("colorType").value = "Solid Color";
  }
}

