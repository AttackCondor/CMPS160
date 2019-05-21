var shader = null;

function main() {
  // Retrieve the canvas from the HTML document
  canvas = document.getElementById("webgl");

  // Retrieve WebGL rendering context
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }

  // Initialize the scene
  var scene = new Scene();
  var camera = new Camera();

  var inputHandler = new InputHandler(canvas, scene, camera);

  // Initialize shader
  shader = new Shader(gl, ASG4_VSHADER, ASG4_FSHADER);

  // Add attibutes
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");
  shader.addAttribute("a_TexCoord");

  shader.addUniform("u_Sampler", "sampler2D", new Matrix4().elements);
  shader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_ModelMatrix", "mat4", new Matrix4().elements);

  var land = new Square(shader, 0, 0, 1, [0,255,0]);
  scene.addGeometry(land);
  var sky = new Cube(shader, 0, 0, 1, [0, 0, 100]);
  scene.addGeometry(sky);
  
  //Load texture and add triangle to the scene with that texture.
  inputHandler.readTexture("objs/cat_.jpg", function(image) {
      var shape = new TexCube(shader, .5, 0, .8, image);
      scene.addGeometry(shape);
  })
  //Load texture and add triangle to the scene with that texture.
  inputHandler.readTexture("objs/sky.jpg", function(image) {
    var shape = new TexCube(shader, 0, 0, 5, image);
    scene.addGeometry(shape);
})

  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, camera);
  renderer.start();


}
