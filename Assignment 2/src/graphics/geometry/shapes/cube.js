/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Connor Koch
 * @this {Cube}
 */
class Cube extends Geometry {
  /**
   * Constructor for Cube.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {cube} cube created
   */
  constructor(shader, x, y, size, color) {
    super(shader);
    this.x = x - size;
    this.y = y - size;
    this.size = size;
    this.color = color;

    this.vertices = this.generateCubeVertices(x, y, size, color);
    this.faces = { 0: this.vertices };
    this.rot = 5;

    this.rotationMatrix = new Matrix4();
    this.translationMatrix = new Matrix4();
    this.scalingMatrix = new Matrix4();
    this.originMatrix = new Matrix4();
    this.positionMatrix = new Matrix4();
    this.initMatrix = new Matrix4();
    this.renitMatrix = new Matrix4();


    this.originMatrix.setTranslate(-1 * x, -1 * y, 0);
    this.positionMatrix.setTranslate(x, y, 0);
    this.renitMatrix.setRotate(25,1,0,0);
    this.rotationMatrix.setRotate(5, 0, 5, 0);

    this.time = 0;
    // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
    this.interleaveVertices();
  }

  generateCubeVertices(x, y, size, color) {
    var vertices = []
    console.log(color);

    //front
    vertices.push(new Vertex(x - size, y - size, size, color));
    vertices.push(new Vertex(x + size, y - size, size,color));
    vertices.push(new Vertex(x + size, y + size, size, color));
    vertices.push(new Vertex(x - size, y + size, size, color));
    vertices.push(new Vertex(x + size, y + size, size, color));
    vertices.push(new Vertex(x - size, y - size, size, color));

    //back
    vertices.push(new Vertex(x - size, y - size, -1*size, color));
    vertices.push(new Vertex(x + size, y - size, -1*size, color));
    vertices.push(new Vertex(x + size, y + size, -1*size, color));
    vertices.push(new Vertex(x - size, y + size, -1*size, color));
    vertices.push(new Vertex(x + size, y + size, -1*size, color));
    vertices.push(new Vertex(x - size, y - size, -1*size, color));

    //rside
    vertices.push(new Vertex(x + size, y - size, -1*size, color));
    vertices.push(new Vertex(x + size, y - size, size, color));
    vertices.push(new Vertex(x + size, y + size, -1*size, color));
    vertices.push(new Vertex(x + size, y + size, size, color));
    vertices.push(new Vertex(x + size, y + size, -1*size, color));
    vertices.push(new Vertex(x + size, y - size, size, color));

    //lside
    vertices.push(new Vertex(x - size, y - size, -1*size, color));
    vertices.push(new Vertex(x - size, y - size, size, color));
    vertices.push(new Vertex(x - size, y + size, -1*size, color));
    vertices.push(new Vertex(x - size, y + size, size, color));
    vertices.push(new Vertex(x - size, y + size, -1*size, color));
    vertices.push(new Vertex(x - size, y - size, size, color));

    //topside
    vertices.push(new Vertex(x - size, y + size, -1*size, color));
    vertices.push(new Vertex(x + size, y + size, size, color));
    vertices.push(new Vertex(x + size, y + size, -1*size, color));
    vertices.push(new Vertex(x - size, y + size, size, color));
    vertices.push(new Vertex(x + size, y + size, size, color));
    vertices.push(new Vertex(x - size, y + size, -1*size, color));

    //botside
    vertices.push(new Vertex(x - size, y - size, -1*size, color));
    vertices.push(new Vertex(x + size, y - size, size, color));
    vertices.push(new Vertex(x + size, y - size, -1*size, color));
    vertices.push(new Vertex(x - size, y - size, size, color));
    vertices.push(new Vertex(x + size, y - size, size, color));
    vertices.push(new Vertex(x - size, y - size, -1*size, color));

    return vertices;
  }

  render() {

    if(this.time == 0){
    this.modelMatrix.multiply(this.renitMatrix);
    this.time ++;
    }
    else{
    this.modelMatrix = this.modelMatrix.multiply(this.positionMatrix);
    this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);
    this.modelMatrix = this.modelMatrix.multiply(this.originMatrix);
    }

    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
  }
}
