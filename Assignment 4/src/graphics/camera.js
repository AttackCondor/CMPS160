/**
 * Specifies a Camera that can Dolly/Truck and Tilt/Pan.
 *
 * @author Lucas N. Ferreira
 * @this {Renderer}
 */
class Camera {
    /**
     * Constructor for Camera.
     *
     * @constructor
     * @returns {Camera} Camera object created
     */
    constructor(shader) {
        this.speed = 0.1;

        // Camera view attributes
        this.eye = new Vector3([0, 0, 1]);
        this.center = new Vector3([0, 0, -1]);
        this.up = new Vector3([0, 1, 0]);

        this.viewMatrix = new Matrix4();
        this.updateView();

        this.projectionMatrix = new Matrix4();
        this.projectionMatrix.setPerspective(40, canvas.width/canvas.height, 1, 100);        
    }

    truck(dir) {
        // Calculate the n camera axis
        var n = this.eye.sub(this.center);
        n = n.normalize()

        // Calculate the u camera axis
        var u = this.up.cross(n);
        u = u.normalize();

        // Scale the u axis to the desired distance to move
        u = u.mul(dir * this.speed);

        // Add the direction vector to both the eye and center positions
        this.eye = this.eye.add(u);
        this.center = this.center.add(u);
        console.log(this.eye.elements, this.center.elements, this.up);

        this.updateView();
    }

    dolly(dir) {
        // Calculate the n camera axis
        console.log("dolly");
        var n = this.eye.sub(this.center);
        n = n.normalize();

        // Scale the n axis to the desired distance to move
        n = n.mul(dir * this.speed);



        // Add the direction vector to both the eye and center positions
        this.eye = this.eye.add(n);
        this.center = this.center.add(n);
        console.log(this.eye.elements, this.center.elements, this.up.elements);

        this.updateView();
    }

    pan(dir) {

    }

    tilt(dir) {
        // //calculate the n axis
        // var n = this.eye.sub(this.center);
        // n.normalize();

        // //calculate the u axis
        // var u = this.up.cross(n);
        // u = u.normalize();

        // var rotateMatrix = new Matrix4();
        // rotateMatrix = rotateMatrix.setRotate(dir, u[0], u[1], u[2]);

        // this.center = this.center * rotateMatrix;

        // this.updateView();
    }


    updateView() {
        this.viewMatrix.setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
            this.center.elements[0], this.center.elements[1], this.center.elements[2],
            this.up.elements[0], this.up.elements[1], this.up.elements[2]);
    }
}
