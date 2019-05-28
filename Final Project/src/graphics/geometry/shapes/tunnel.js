/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Connor Koch
 * @this {Cube}
 */
class Tunnel extends Geometry {
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

    this.vertices = this.generateTunnelVertices(x, y, size, color);
    this.faces = { 0: this.vertices };
    this.rot = 5;

    this.modelMatrix = new Matrix4();
    this.rotationMatrix = new Matrix4();
    this.translationMatrix = new Matrix4();
    this.scalingMatrix = new Matrix4();
    this.originMatrix = new Matrix4();
    this.positionMatrix = new Matrix4();
    this.initMatrix = new Matrix4();
    this.renitMatrix = new Matrix4();


    this.time = 0;
    // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
    this.interleaveVertices();
  }

  generateTunnelVertices(x, y, size, color) {
    var vertices = []

    //rside
    var vertex12 = new Vertex(x + size, y - size, -1*size, color);
    var vertex13 = new Vertex(x + size, y - size, size, color);
    var vertex14 = new Vertex(x + size, y + size, -1*size, color);
    var vertex15 = new Vertex(x + size, y + size, size, color);
    var vertex16 = new Vertex(x + size, y + size, -1*size, color);
    var vertex17 = new Vertex(x + size, y - size, size, color);

    //lside
    var vertex18 = new Vertex(x - size, y - size, -1*size, color);
    var vertex19 = new Vertex(x - size, y - size, size, color);
    var vertex20 = new Vertex(x - size, y + size, -1*size, color);
    var vertex21 = new Vertex(x - size, y + size, size, color);
    var vertex22 = new Vertex(x - size, y + size, -1*size, color);
    var vertex23 = new Vertex(x - size, y - size, size, color);

    //topside
    var vertex24 = new Vertex(x - size, y + size, -1*size, color);
    var vertex25 = new Vertex(x + size, y + size, size, color);
    var vertex26 = new Vertex(x + size, y + size, -1*size, color);
    var vertex27 = new Vertex(x - size, y + size, size, color);
    var vertex28 = new Vertex(x + size, y + size, size, color);
    var vertex29 = new Vertex(x - size, y + size, -1*size, color);

    //botside
    var vertex30 = new Vertex(x - size, y - size, -1*size, color);
    var vertex31 = new Vertex(x + size, y - size, size, color);
    var vertex32 = new Vertex(x + size, y - size, -1*size, color);
    var vertex33 = new Vertex(x - size, y - size, size, color);
    var vertex34 = new Vertex(x + size, y - size, size, color);
    var vertex35 = new Vertex(x - size, y - size, -1*size, color);

    vertices.push(vertex12);
    vertices.push(vertex13);
    vertices.push(vertex14);
    vertices.push(vertex15);
    vertices.push(vertex16);
    vertices.push(vertex17);
    vertices.push(vertex18);
    vertices.push(vertex19);
    vertices.push(vertex20);
    vertices.push(vertex21);
    vertices.push(vertex22);
    vertices.push(vertex23);
    vertices.push(vertex24);
    vertices.push(vertex25);
    vertices.push(vertex26);
    vertices.push(vertex27);
    vertices.push(vertex28);
    vertices.push(vertex29);
    vertices.push(vertex30);
    vertices.push(vertex31);
    vertices.push(vertex32);
    vertices.push(vertex33);
    vertices.push(vertex34);
    vertices.push(vertex35);

    return vertices;
  }

  render() {

    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
  }
}
