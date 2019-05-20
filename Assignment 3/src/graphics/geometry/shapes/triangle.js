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

        this.x = x - size;
        this.y = y - size;
        this.size = size;
        this.color = color;

        this.vertices = this.generateTriangleVertices(x, y, size, color);
        this.faces = { 0: [0, 1, 2] };
        this.rot = 0;
        this.scale = 1.05;

        this.modelMatrix = new Matrix4();
        this.rotationMatrix = new Matrix4();
        this.translationMatrix = new Matrix4();
        this.scalingMatrix = new Matrix4();
        this.originMatrix = new Matrix4();
        this.positionMatrix = new Matrix4();

        this.originMatrix.setTranslate(-1*x, -1*y, 0);
        this.positionMatrix.setTranslate(x, y, 0);
        this.scalingMatrix.setScale(1 / this.scale, 1 / this.scale, 1);

        this.time = 0;
        // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
        this.interleaveVertices();
    }

    generateTriangleVertices(x, y, size, color) {
        var vertices = []
        var vertex1 = new Vertex(x-size, y-size, 0.0, color);
        var vertex2 = new Vertex(x+size, y-size, 0.0, color);
        var vertex3 = new Vertex( x,   y+size, 0.0, color);

        vertices.push(vertex1);
        vertices.push(vertex2);
        vertices.push(vertex3);

        return vertices;
    }

    render() {
        this.time += 1;
        if (this.time == 15) {
            this.scalingMatrix.setScale(1 * this.scale, 1 * this.scale, 1);
        }
        if (this.time == 30) {
            this.scalingMatrix.setScale(1 / this.scale, 1 / this.scale, 1);
            this.time = 0;
        }
        this.modelMatrix = this.modelMatrix.multiply(this.positionMatrix);
        this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);
        this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
        this.modelMatrix = this.modelMatrix.multiply(this.scalingMatrix);
        this.modelMatrix = this.modelMatrix.multiply(this.originMatrix);

        this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
    }
}
