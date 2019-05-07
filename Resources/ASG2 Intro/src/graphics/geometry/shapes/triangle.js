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
  constructor(shader) {
      super(shader);

      this.vertices = this.generateTriangleVertices();
      this.faces = {0: [0, 1, 2]};
      this.rot = 0;

      this.rotationMatrix = new Matrix4();
      this.rotationMatrix.setRotate(5,0,0,1);

      this.translationMatrix = new Matrix4();
      this.translationMatrix.setTranslate(0,0.05,0);

      this.scalingMatrix = new Matrix4();
      this.scalingMatrix.setScale(1.25,1.25,1.25);

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateTriangleVertices() {
      var vertices = []

      // Vertex 0
      var vertex0 = new Vertex(-0.25, -0.25, 0.0);
      vertices.push(vertex0);

      // Vertex1
      var vertex1 = new Vertex( 0.25, -0.25, 0.0);
      vertices.push(vertex1);

      // Vertex 2
      var vertex2 = new Vertex( 0.0,   0.25, 0.0);
      vertices.push(vertex2);

      return vertices;
   }

   render() {
       this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);
       // this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
       // this.modelMatrix = this.modelMatrix.multiply(this.scalingMatrix);

       this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
   }
}
