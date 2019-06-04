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
  // Initialize shader
  shader = new Shader(gl, ASG3_VSHADER, ASG3_FSHADER);
  shader2 = new Shader(gl, ASG1_VSHADER, ASG1_FSHADER);


  // Add attibutes
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");
  shader.addAttribute("a_TexCoord");
  shader.addUniform("u_ModelMatrix", "mat4", idMatrix.elements);

  shader2.addAttribute("a_Position");
  shader2.addAttribute("a_Color");
  shader2.addUniform("u_ModelMatrix", "mat4", idMatrix.elements);
  



  var ship = new Ship(shader2);
  scene.addGeometry(ship);
  for (var i = 0; i <= 3; i++) {
    var ast = new Asteroid(shader2, ((Math.random()*2)+1)/10, 1.15, 1.15);
    scene.addGeometry(ast);
  }
  // var square1 = new Square(shader2, -.5, .6, .15, [0,255,0]);
  // scene.addGeometry(square1);
  // var square2 = new Square(shader2, 0, .6, .15, [255,0,0]);
  // scene.addGeometry(square2);
  // var square3 = new Square(shader2, .5, .6, .15, [0,0,255]);
  // scene.addGeometry(square3);

  
  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, null);
  renderer.start();

  // gl.onmousedown = function(ev){
  //   var x = ev.clientX, y = ev.clientY;
  //   var rect = ev.target.getBoundingClientRect();
  //   var x_in_canvas = x - rect.left, y_in_canvas = rect.bottom - y;
  //   var pixels = new Uint8Array(4);
  //   console.log(x, y);
  //   renderer.render();
  //   gl.readPixels(x_in_canvas, y_in_canvas, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  //   console.log(pixels);
  //   if(pixels[1]==255){
  //     alert("you clicked the green box")
  //   }
  //   else if(pixels[0]==255){
  //     alert("you clicked the red box")
  //   }
  //   else if(pixels[2]==255){
  //     alert("you clicked the blue box")
  //   }
  // }

}

