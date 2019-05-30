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
    this.canvas.onmousedown = function (ev) { this.mouseheld = true; _inputHandler.click(ev); };
    this.canvas.onmouseup = function () { this.mouseheld = false; };
    this.canvas.onmousemove = function (ev) { if (this.mouseheld) { _inputHandler.click(ev) } };

    //button events
    document.getElementById("clear").onclick = function () { _inputHandler.scene.clearGeometries(); };
    document.addEventListener('keydown', function (ev) { _inputHandler.keyDown(ev); }, false);
    document.addEventListener('keyup', function (ev) { _inputHandler.keyUp(ev); }, false);

  }

  /**
   * Function called upon mouse click.
   */
  click(ev) {
    // Print x,y coordinates.
    console.log(ev.clientX, ev.clientY);
    //Convert coordinates to webgl style
    var x = (ev.clientX - (canvas.height / 2)) / (canvas.height / 2);
    var y = ((canvas.height / 2) - ev.clientY) / (canvas.height / 2);
  }
  keyUp(ev) {
    var keyName = event.key;
    //console.log("key up", keyName);
    if (keyName == "a") {
      //left
      _inputHandler.scene.geometries[0].lrot = 0;
      console.log(_inputHandler.scene.geometries[0].dirVec.elements);
    }
    else if (keyName == "d") {
      //right
      _inputHandler.scene.geometries[0].rrot = 0;
      console.log(_inputHandler.scene.geometries[0].dirVec.elements);
    }
    else if (keyName == "w") {
      //up
    }
    else if (keyName == "s") {
      //down
    }
  }

  keyDown(ev) {
    var keyName = event.key;
    // console.log("key down", keyName);
    if (keyName == "a") {
      //left
      _inputHandler.scene.geometries[0].lrot = 3;
    }
    else if (keyName == "d") {
      //right
      _inputHandler.scene.geometries[0].rrot = -3;
      //console.log(_inputHandler.scene.geometries[0].dirVec.elements);
    }
    else if (keyName == "w") {
      //up
      console.log(_inputHandler.scene.geometries[0].dirVec.elements);
      _inputHandler.scene.geometries[0].xMom += _inputHandler.scene.geometries[0].dirVec.elements[0] * .01;
      _inputHandler.scene.geometries[0].yMom += _inputHandler.scene.geometries[0].dirVec.elements[1] * .01;
      console.log(_inputHandler.scene.geometries[0].xMom, _inputHandler.scene.geometries[0].yMom);
    }
    else if (keyName == "s") {
      //down
    }

  }


}

