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
  // var hud = getWebGLContext(canvas);
  // if (!hud) {
  //   console.log("Failed to get WebGL rendering context. (hud)");
  //   return;
  // }

  // Initialize the scene
  var scene = new Scene();
  var hudscene = new Scene();
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

  // Add uniforms
  shader2.addUniform("u_ModelMatrix", "mat4", idMatrix.elements);



  var ship = new Ship(shader2);
  scene.addGeometry(ship);
  for (var i = 0; i <= 3; i++) {
    var ast = new Asteroid(shader2, ((Math.random()*2)+1)/10, 1.15, 1.15);
    scene.addGeometry(ast);
  }

  var ship = new Explosion(shader2, .2, .2);
  hudscene.addGeometry(ship);

  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, null);
  renderer.start();
  // hudrenderer = new Renderer(hud, hudscene, null);
  // hudrenderer.start();

  canvas.onmousedown = function(ev){
    renderer.render();
    var pixels = new Uint8Array(4);
    gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    
    console.log(pixels);
  }




}
