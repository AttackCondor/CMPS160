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
    if(!color){
    //front
    var vertex0 = new TexVertex(x - size, y - size, size);
    vertex0.texCoord = [0.0, 0.0];
    var vertex1 = new TexVertex(x + size, y - size, size);
    vertex1.texCoord = [1.0, 0.0];
    var vertex2 = new TexVertex(x + size, y + size, size);
    vertex2.texCoord = [0.0, 1.0];
    var vertex3 = new TexVertex(x - size, y + size, size);
    vertex3.texCoord = [0.0, 1.0];
    var vertex4 = new TexVertex(x + size, y + size, size);
    vertex4.texCoord = [1.0, 1.0];
    var vertex5 = new TexVertex(x - size, y - size, size);
    vertex5.texCoord = [0.0, 0.0];

    //back
    var vertex6 = new TexVertex(x - size, y - size, -1*size);
    var vertex7 = new TexVertex(x + size, y - size, -1*size);
    var vertex8 = new TexVertex(x + size, y + size, -1*size);
    var vertex9 = new TexVertex(x - size, y + size, -1*size);
    var vertex10 = new TexVertex(x + size, y + size, -1*size);
    var vertex11 = new TexVertex(x - size, y - size, -1*size);

    //rside
    var vertex12 = new TexVertex(x + size, y - size, -1*size);
    var vertex13 = new TexVertex(x + size, y - size, size);
    var vertex14 = new TexVertex(x + size, y + size, -1*size);
    var vertex15 = new TexVertex(x + size, y + size, size);
    var vertex16 = new TexVertex(x + size, y + size, -1*size);
    var vertex17 = new TexVertex(x + size, y - size, size);

    //lside
    var vertex18 = new TexVertex(x - size, y - size, -1*size);
    var vertex19 = new TexVertex(x - size, y - size, size);
    var vertex20 = new TexVertex(x - size, y + size, -1*size);
    var vertex21 = new TexVertex(x - size, y + size, size);
    var vertex22 = new TexVertex(x - size, y + size, -1*size);
    var vertex23 = new TexVertex(x - size, y - size, size);

    //topside
    var vertex24 = new TexVertex(x - size, y + size, -1*size);
    var vertex25 = new TexVertex(x + size, y + size, size);
    var vertex26 = new TexVertex(x + size, y + size, -1*size);
    var vertex27 = new TexVertex(x - size, y + size, size);
    var vertex28 = new TexVertex(x + size, y + size, size);
    var vertex29 = new TexVertex(x - size, y + size, -1*size);

    //botside
    var vertex30 = new TexVertex(x - size, y - size, -1*size);
    var vertex31 = new TexVertex(x + size, y - size, size);
    var vertex32 = new TexVertex(x + size, y - size, -1*size);
    var vertex33 = new TexVertex(x - size, y - size, size);
    var vertex34 = new TexVertex(x + size, y - size, size);
    var vertex35 = new TexVertex(x - size, y - size, -1*size);
    } 
    
    else{
          //front
    var vertex0 = new Vertex(x - size, y - size, size,color);
    var vertex1 = new Vertex(x + size, y - size, size,color);
    var vertex2 = new Vertex(x + size, y + size, size,color);
    var vertex3 = new Vertex(x - size, y + size, size,color);
    var vertex4 = new Vertex(x + size, y + size, size,color);
    var vertex5 = new Vertex(x - size, y - size, size,color);

    //back
    var vertex6 = new Vertex(x - size, y - size, -1*size,color);
    var vertex7 = new Vertex(x + size, y - size, -1*size,color);
    var vertex8 = new Vertex(x + size, y + size, -1*size,color);
    var vertex9 = new Vertex(x - size, y + size, -1*size,color);
    var vertex10 = new Vertex(x + size, y + size, -1*size,color);
    var vertex11 = new Vertex(x - size, y - size, -1*size,color);

    //rside
    var vertex12 = new Vertex(x + size, y - size, -1*size,color);
    var vertex13 = new Vertex(x + size, y - size, size,color);
    var vertex14 = new Vertex(x + size, y + size, -1*size,color);
    var vertex15 = new Vertex(x + size, y + size, size,color);
    var vertex16 = new Vertex(x + size, y + size, -1*size,color);
    var vertex17 = new Vertex(x + size, y - size, size,color);

    //lside
    var vertex18 = new Vertex(x - size, y - size, -1*size,color);
    var vertex19 = new Vertex(x - size, y - size, size,color);
    var vertex20 = new Vertex(x - size, y + size, -1*size,color);
    var vertex21 = new Vertex(x - size, y + size, size,color);
    var vertex22 = new Vertex(x - size, y + size, -1*size,color);
    var vertex23 = new Vertex(x - size, y - size, size,color);

    //topside
    var vertex24 = new Vertex(x - size, y + size, -1*size,color);
    var vertex25 = new Vertex(x + size, y + size, size,color);
    var vertex26 = new Vertex(x + size, y + size, -1*size,color);
    var vertex27 = new Vertex(x - size, y + size, size,color);
    var vertex28 = new Vertex(x + size, y + size, size,color);
    var vertex29 = new Vertex(x - size, y + size, -1*size,color);

    //botside
    var vertex30 = new Vertex(x - size, y - size, -1*size,color);
    var vertex31 = new Vertex(x + size, y - size, size,color);
    var vertex32 = new Vertex(x + size, y - size, -1*size,color);
    var vertex33 = new Vertex(x - size, y - size, size,color);
    var vertex34 = new Vertex(x + size, y - size, size,color);
    var vertex35 = new Vertex(x - size, y - size, -1*size,color);

    }

    vertices.push(vertex0);
    vertices.push(vertex1);
    vertices.push(vertex2);
    vertices.push(vertex3);
    vertices.push(vertex4);
    vertices.push(vertex5);
    vertices.push(vertex6);
    vertices.push(vertex7);
    vertices.push(vertex8);
    vertices.push(vertex9);
    vertices.push(vertex10);
    vertices.push(vertex11);
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
