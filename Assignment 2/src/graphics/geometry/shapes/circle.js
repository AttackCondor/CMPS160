/**
 * Specifies a circle. A subclass of geometry.
 *
 * @author Connor Koch
 * @this {Circle}
 */
class Circle extends Geometry {
    /**
     * Constructor for Square.
     *
     * @constructor
     * @param {Shader} shader Shading object used to shade geometry
     * @returns {Square} Square created
     */
    constructor(shader, x, y, size, color, segments) {
        super(shader);
  
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.segments = segments;
        this.xmov = ((Math.random()*2) -1)/20;
        this.ymov = ((Math.random()*2) -1)/20;
  
        this.vertices = this.generateCircleVertices(x, y, size, color, segments);
        this.faces = { 0: [0, 1, 2] };

        this.rotationMatrix = new Matrix4();
        this.translationMatrix = new Matrix4();
        this.scalingMatrix = new Matrix4();
        this.originMatrix = new Matrix4();
        this.positionMatrix = new Matrix4();

        this.originMatrix.setTranslate(-1*x, -1*y, 0);
        this.positionMatrix.setTranslate(x, y, 0);
        this.translationMatrix.setTranslate(this.xmov, this.ymov, 0);
        this.time = 0;
        // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
        this.interleaveVertices();
    }
  
    generateCircleVertices(x, y, size, color, segments) {
        var vertices = []
        var i = 0;
        for(i = 0; i<360; i+=(360/segments)){
            var seglen = 360/segments;
            var angle1 = Math.PI * 2 * i / 360
            var angle2 = Math.PI * 2 * (i+seglen) / 360
            var vertex1 = new Vertex(x, y, 0.0, color);
            var vertex2 = new Vertex(x + (Math.sin(angle1)*size), y + (Math.cos(angle1)*size), 0.0, color);
            var vertex3 = new Vertex(x + (Math.sin(angle2)*size), y + (Math.cos(angle2)*size), 0.0, color);
            vertices.push(vertex1);
            vertices.push(vertex2);
            vertices.push(vertex3);
        }  
  
        return vertices;
    }
    render() {
        this.time+=1;
        this.x += this.xmov;
        this.y += this.ymov;
        if (this.time%20 == 0) {
            this.xmov = ((Math.random()) -.5)/30;
            this.ymov = ((Math.random()) -.5)/30;
        }
        if(this.x >= 1) this.xmov= ((Math.random()/2)*-1)/30;
        if(this.x <= -1) this.xmov= (Math.random()/2)/30;
        if(this.y >= 1) this.ymov= ((Math.random()/2)*-1)/30;
        if(this.y <= -1) this.ymov= (Math.random()/2)/30;

        this.translationMatrix.setTranslate(this.xmov, this.ymov, 0);
        

        this.modelMatrix = this.modelMatrix.multiply(this.positionMatrix);
        this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);
        this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
        this.modelMatrix = this.modelMatrix.multiply(this.scalingMatrix);
        this.modelMatrix = this.modelMatrix.multiply(this.originMatrix);
    
        this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
      }
  }
  