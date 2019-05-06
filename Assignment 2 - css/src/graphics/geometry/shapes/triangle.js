/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Triangle}
 */
class Triangle extends Geometry {
  /**
   * Constructor for Triangle.
   * 
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Triangle} Triangle created
   */
  constructor(shader, x, y, size, color) {
      super(shader);

      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;

      this.vertices = this.generateTriangleVertices(x, y, size, color);
      this.faces = {0: this.vertices};

      this.rotationMatrix = new Matrix4();
      this.rotationMatrix.setRotate(5,0,0,1);

      this.translationMatrix = new Matrix4();
      this.translationMatrix.setTranslate(0,0.05,0);

      this.scalingMatrix = new Matrix4();
      this.scalingMatrix.setScale(1.25,1.25,1.25);

      this.modelMatrix = new Matrix4();
      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateTriangleVertices(x, y, size, color) {
      var vertices = []
      console.log(color);
      var vertex1 = new Vertex(x-size, y-size, 0.0, color);
      var vertex2 = new Vertex(x+size, y-size, 0.0, color);
      var vertex3 = new Vertex( x,   y+size, 0.0, color);

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);

      return vertices;
  }

  render() {
    // this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);
    // this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
     this.modelMatrix = this.modelMatrix.multiply(this.scalingMatrix);

     this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
}
}
