/**
 *
 * @author Connor Koch
 * @this {ship}
 */
class Ship extends Geometry {
  /**
   * Constructor for Ship
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {ship} ship created
   */
  constructor(shader) {
    super(shader);
    this.xCor = 0;
    this.yCor = 0;
    this.xMom = 0;
    this.yMom = 0;
    this.color = [0, 255, 0];

    this.vertices = this.generateShipVertices();
    this.faces = { 0: this.vertices };

    this.modelMatrix = new Matrix4();

    // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
    this.interleaveVertices();
  }

  generateShipVertices() {
    var vertices = []

    console.log(this.xCor);
    //Left side
    var vertex0 = new Vertex(this.xCor, this.yCor, 0, [0,0,0]); //center
    var vertex1 = new Vertex(this.xCor-.04, this.yCor-.04, 0, this.color); //left bottom
    var vertex2 = new Vertex(this.xCor, this.yCor+.08, 0, this.color);  //front

    //Right side
    var vertex3 = new Vertex(this.xCor, this.yCor, 0, [0,0,0]); //center
    var vertex4 = new Vertex(this.xCor+.04, this.yCor-.04, 0, this.color); //right bottom
    var vertex5 = new Vertex(this.xCor, this.yCor+.08, 0, this.color); //front

    //Bot side
    var vertex6 = new Vertex(this.xCor, this.yCor, 0, [0,0,0]); //center
    var vertex7 = new Vertex(this.xCor-.04, this.yCor-.04, 0, this.color); //left bottom
    var vertex8 = new Vertex(this.xCor+.04, this.yCor-.04, 0, this.color); //right bottom


    vertices.push(vertex0);
    vertices.push(vertex1);
    vertices.push(vertex2);
    vertices.push(vertex3);
    vertices.push(vertex4);
    vertices.push(vertex5);
    vertices.push(vertex6);
    vertices.push(vertex7);
    vertices.push(vertex8);

    return vertices;
  }

  render() {

    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
    
  }
}
