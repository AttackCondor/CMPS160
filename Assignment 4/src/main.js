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



  //Generate Map array
  var mapArray = new Array(32);
  for (var i = 0; i < mapArray.length; i++) {
    mapArray[i] = new Array(32);
    for (var j = 0; j < mapArray.length; j++) {
      //mapArray[i][j] = Math.floor((Math.random() * 16) - 13);
      if(i===0 || i===31 || j===0 || j===31){
        mapArray[i][j] = Math.floor(Math.random()*4)+1;
      }
      if (mapArray[i][j] < 0) mapArray[i][j] = 0;
    }
  }
  console.log(mapArray);


  //Load texture and add triangle to the scene with that texture.
  inputHandler.readTexture("objs/brick.jpg", function (image) {
    for (var i = 0; i < mapArray.length; i++) {
      for (var j = 0; j < mapArray.length; j++) {
        for (var c = mapArray[i][j]; c > 0; c--) {
          var cube = new TexCube(shader, (i-16)/2, (c/2)-1.5, (j-16)/2, .5, image);
          scene.addGeometry(cube);
        }
      }
    }

  })

  //Load texture and add triangle to the scene with that texture.
  inputHandler.readTexture("objs/blue.jpg", function (image) {
    var shape = new TexCube(shader, 0, 0, 0, 3, image);
    scene.addGeometry(shape);
  })
  //Load texture and add triangle to the scene with that texture.
  inputHandler.readTexture("objs/teapot.jpg", function (image) {
    var shape = new TexCube(shader, 0, -26.25, 0, 5, image);
    scene.addGeometry(shape);
  })



  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, camera);
  renderer.start();


}
