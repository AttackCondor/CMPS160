/**
 *
 * @author Connor Koch
 * @this {Bullet}
 */
class Bullet extends Geometry {
  /**
   * Constructor for Bullet
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Bullet} Bullet created
   */
  constructor(shader, pos, dir) {
    super(shader);
    this.id = "bullet";
    this.xMom = pos.elements[0];
    this.yMom = pos.elements[1];
    this.color = [255, 0, 0];
    this.dirVec = dir;
    this.posVec = pos;
    this.transMatrix = new Matrix4();
    this.transMatrix.setTranslate(pos.elements[0], pos.elements[1], 0);
    this.modelMatrix = new Matrix4();
    this.time = 0;

    this.vertices = this.generateBulletVertices();
    this.faces = { 0: this.vertices };

    // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
    this.interleaveVertices();
  }

  generateBulletVertices() {
    var vertices = []

    //bullet vertices
    var vertex0 = new Vertex(0, 0, 0, [0, 0, 0]); //front
    var vertex1 = new Vertex(-.005,-.01, 0, this.color); //left bottom
    var vertex2 = new Vertex(.005, -.01, 0, this.color);  //right bottom

    vertices.push(vertex0);
    vertices.push(vertex1);
    vertices.push(vertex2);

    return vertices;
  }

  render() {
    if (this.time = 0) {
      this.xMom += this.dirVec.elements[0] * .1;
      this.yMom += this.dirVec.elements[1] * .1;
    }
    
    //Set the rotation matrix to the desired rotation
    this.time++;
    this.xMom += this.dirVec.elements[0] * .03;
    this.yMom += this.dirVec.elements[1] * .03;

    //Set the translation matrix equal to the x momentum and y momentum
    this.transMatrix.setTranslate(this.xMom, this.yMom, 0);
    this.posVec = new Vector3([this.xMom,this.yMom,0]);

    //Bound checking
    if (this.posVec.elements[0] > 1) {
      this.time = 40;
    }
    if (this.posVec.elements[0] < -1) {
      this.time = 40;
    }
    if (this.posVec.elements[1] > 1) {
      this.time = 40;
    }
    if (this.posVec.elements[1] < -1) {
      this.time = 40;
    }

    //Factor these matrices into the model matrix
    this.modelMatrix.multiply(this.transMatrix);
    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
    this.modelMatrix = new Matrix4();
  }
}
