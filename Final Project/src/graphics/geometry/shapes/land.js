/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Connor Koch
 * @this {Square}
 */
class Land extends Geometry {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Square} Square created
   */
  constructor(shader, image) {
    super(shader);
    this.image = image;

    this.vertices = this.generatelandVertices();
    this.faces = { 0: this.vertices };


    this.modelMatrix = new Matrix4();

    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
    // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
    this.interleaveVertices();
  }

  generatelandVertices() {
    var vertices = []
    var vertex1 = new Vertex(-32.0, -1.0, -32.0, color);
    var vertex2 = new Vertex(-32.0, -1.0, 32.0, color);
    var vertex3 = new Vertex(32.0, -1.0, -32.0, color);

    var vertex4 = new Vertex(32.0, -1, -32.0, color);
    var vertex5 = new Vertex(-32.0, -1, 32.0, color);
    var vertex6 = new Vertex(32.0, -1, 32.0, color);

    vertices.push(vertex1);
    vertices.push(vertex2);
    vertices.push(vertex3);
    vertices.push(vertex4);
    vertices.push(vertex5);
    vertices.push(vertex6);


    return vertices;
  }

  render() {
    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
  }
}
