var shader = null;

function main() {
  // Retrieve the canvas from the HTML document
  canvas = document.getElementById("webgl");
  //hud = document.getElementById("hud");

  // Retrieve WebGL rendering context
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }
  // var ctx = getWebGLContext(hud);
  // if (!ctx) {
  //   console.log("Failed to get WebGL rendering context. (hud)");
  //   //return;
  // }

  // Initialize the scene
  var scene = new Scene();
  //var hudscene = new Scene();
  var inputHandler = new InputHandler(canvas, scene);


  var idMatrix = new Matrix4();
  // Initialize shaders
  shipshader = new Shader(gl, SHIP_VSHADER, SHIP_FSHADER);
  shader = new Shader(gl, REG_VSHADER, REG_FSHADER);

  // Add attibutes to REG shader
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");
  shader.addUniform("u_ModelMatrix", "mat4", idMatrix.elements);

  // Add attibutes to SHIP shader
  shipshader.addAttribute("a_Position");
  shipshader.addAttribute("a_Color");
  shipshader.addUniform("u_ModelMatrix", "mat4", idMatrix.elements);
  shipshader.addUniform("u_Boost", "bool", 0);
  //console.log(shipshader.uniforms);


  //Add geometries to init screen
  var ship = new Ship(shipshader);
  scene.addGeometry(ship);
  for (var i = 0; i <= 3; i++) {
    var ast = new Asteroid(shader, ((Math.random() * 2) + 1) / 10, 1.15, 1.15);
    scene.addGeometry(ast);
  }


  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, null);
  renderer.start();

  console.log(gl);
  gl.onmousedown = function(ev){
    var x = ev.clientX, y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    var x_in_canvas = x - rect.left, y_in_canvas = rect.bottom - y;
    var pixels = new Uint8Array(4);
    console.log(x, y);
    renderer.render();
    gl.readPixels(x_in_canvas, y_in_canvas, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    console.log(pixels);

  }

}

