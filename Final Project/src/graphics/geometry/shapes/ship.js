/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Triangle}
 */
class Ship extends Geometry {
    /**
     * Constructor for Triangle.
     *
     * @constructor
     * @param {Shader} shader Shading object used to shade geometry
     * @returns {Triangle} Triangle created
     */
    constructor(shader, x, y, z, size, image) {
        super(shader);

        this.x = x;
        this.y = y;
        this.size = size;
        this.image = image;

        this.vertices = this.generateShipVertices();
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

    generateShipVertices() {
        var vertices = []

        //back plate
        var vertex0 = new Vertex(-.25, -.1, 0);
        var vertex1 = new Vertex(.25, -.1, 0);
        var vertex2 = new Vertex(0, .1, 0);
        vertex0.texCoord = [0.0, 0.0];
        vertex1.texCoord = [1.0, 0.0];
        vertex2.texCoord = [1.0, 1.0];

        //front right panel
        var vertex3 = new Vertex(0, .1, 0);
        var vertex4 = new Vertex(.25, -.1, 0);
        var vertex5 = new Vertex(0, -.1, .75);
        vertex3.texCoord = [0.0, 1.0];
        vertex4.texCoord = [1.0, 1.0];
        vertex5.texCoord = [0.0, 0.0];

        //front left panel
        var vertex6 = new Vertex(0, .1, 0);
        var vertex7 = new Vertex(-.25, -.1, 0);
        var vertex8 = new Vertex(0, -.1, .75);
        vertex6.texCoord = [0.0, 0.5];
        vertex7.texCoord = [1.0, 0.5];
        vertex8.texCoord = [1.0, 1.0];

        //bottom panel
        var vertex9 = new Vertex(-.25, -.1, 0);
        var vertex10 = new Vertex(.25, -.1, 0);
        var vertex11 = new Vertex(0, -.1, .75);
        vertex9.texCoord = [0.0, 1.0];
        vertex10.texCoord = [1.0, 1.0];
        vertex11.texCoord = [0.0, 0.5];

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

        return vertices;
    }

    render() {
        this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
    }

}
