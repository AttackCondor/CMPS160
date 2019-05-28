/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Triangle}
 */
class Tunnel extends Geometry {
    /**
     * Constructor for Triangle.
     *
     * @constructor
     * @param {Shader} shader Shading object used to shade geometry
     * @returns {Triangle} Triangle created
     */
    constructor(shader, x, y, z, size, image) {
        super(shader);

        this.x = 0;
        this.y = 0;
        this.size = 1;
        this.image = image;

        this.vertices = this.generateTunnelVertices();
        this.faces = { 0: this.vertices };

        this.modelMatrix = new Matrix4();
        this.scaleMatrix = new Matrix4();
        this.rotationMatrix = new Matrix4();
        this.translateMatrix = new Matrix4();
        this.initMatrix = new Matrix4();

        this.translateMatrix.setTranslate(x, y, z);
        this.scaleMatrix.setScale(size, size, size);

        this.modelMatrix.multiply(this.initMatrix);
        this.modelMatrix.multiply(this.translateMatrix);
        this.modelMatrix.multiply(this.scaleMatrix);

        this.shader.setUniform("u_ViewMatrix", this.modelMatrix.elements);

        // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
        this.interleaveVertices();
    }

    generateTunnelVertices() {
        var vertices = []

        // //rside - bottom half
        var vertex12 = new Vertex(this.size, -this.size, -this.size);
        var vertex13 = new Vertex(this.size, -this.size, this.size);
        var vertex14 = new Vertex(this.size, this.size, -this.size);
        var vertex15 = new Vertex(this.size, this.size, this.size);
        var vertex16 = new Vertex(this.size, this.size, -this.size);
        var vertex17 = new Vertex(this.size, -this.size, this.size);
        vertex12.texCoord = [0.0, 0.0];
        vertex13.texCoord = [0.0, 1.0];
        vertex14.texCoord = [1.0, 1.0];
        // vertex15.texCoord = [0.0, 1.0];
        // vertex16.texCoord = [1.0, 0.0];
        // vertex17.texCoord = [0.0, 0.0];

        //lside - two next to each other
        var vertex18 = new Vertex(-this.size, -this.size, -this.size);
        var vertex19 = new Vertex(-this.size, -this.size, this.size);
        var vertex20 = new Vertex(-this.size, this.size, -this.size);
        var vertex21 = new Vertex(-this.size, this.size, this.size);
        var vertex22 = new Vertex(-this.size, this.size, -this.size);
        var vertex23 = new Vertex(-this.size, -this.size, this.size);
        vertex18.texCoord = [0.0, 0.0];
        vertex19.texCoord = [1.0, 0.0];
        vertex20.texCoord = [1.0, 1.0];
        vertex21.texCoord = [0.0, 1.0];
        vertex22.texCoord = [1.0, 0.0];
        vertex23.texCoord = [0.0, 0.0];

        //topside - 3x3 grid
        var vertex24 = new Vertex(-this.size, this.size, -this.size);
        var vertex25 = new Vertex(this.size, this.size, this.size);
        var vertex26 = new Vertex(this.size, this.size, -this.size);
        var vertex27 = new Vertex(-this.size, this.size, this.size);
        var vertex28 = new Vertex(this.size, this.size, this.size);
        var vertex29 = new Vertex(-this.size, this.size, -this.size);
        vertex24.texCoord = [0.0, 0.0];
        vertex25.texCoord = [1.0, 0.0];
        vertex26.texCoord = [1.0, 1.0];
        vertex27.texCoord = [0.0, 1.0];
        vertex28.texCoord = [1.0, 0.0];
        vertex29.texCoord = [0.0, 0.0];

        //botside - none
        var vertex30 = new Vertex(-this.size, -this.size, -this.size);
        var vertex31 = new Vertex(this.size, -this.size, this.size);
        var vertex32 = new Vertex(this.size, -this.size, -this.size);
        var vertex33 = new Vertex(-this.size, -this.size, this.size);
        var vertex34 = new Vertex(this.size, -this.size, this.size);
        var vertex35 = new Vertex(-this.size, -this.size, -this.size);

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
