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
        this.eye = new Vector3([0, 0, 0]);
        this.center = new Vector3([0, 0, 1]);
        this.up = new Vector3([0, 1, 0]);

        this.viewMatrix = new Matrix4();
        this.updateView();
        this.state = 1;

        this.projectionMatrix = new Matrix4();
        this.projectionMatrix.setPerspective(40, canvas.width / canvas.height, 1, 100);
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

        this.updateView();
    }

    dolly(dir) {
        // Calculate the n camera axis
        var n = this.eye.sub(this.center);
        n = n.normalize();

        // Scale the n axis to the desired distance to move
        n = n.mul(dir * this.speed);

        // Add the direction vector to both the eye and center positions
        this.eye = this.eye.add(n);
        this.center = this.center.add(n);

        this.updateView();
    }

    pan(dir) {

        var rotateMatrix = new Matrix4();
        rotateMatrix = rotateMatrix.setRotate(dir * .5, this.up.elements[0], this.up.elements[1], this.up.elements[2]);

        this.center = rotateMatrix.multiplyVector3(this.center);

        this.updateView();

    }

    tilt(dir) {
        // Calculate the n camera axis
        var n = this.eye.sub(this.center);
        n = n.normalize()

        // Calculate the u camera axis
        var u = this.up.cross(n);
        u = u.normalize();

        var rotateMatrix = new Matrix4();
        rotateMatrix = rotateMatrix.setRotate(dir * .5, u.elements[0], u.elements[1], u.elements[2]);

        this.center = rotateMatrix.multiplyVector3(this.center);
        console.log(this.center);

        this.updateView();
    }

    zoom(dir) {

        this.updateView();

    }


    updateView() {
        this.viewMatrix.setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
            this.center.elements[0], this.center.elements[1], this.center.elements[2],
            this.up.elements[0], this.up.elements[1], this.up.elements[2]);
    }

    swap() {
        if (this.state === 1) {
            this.projectionMatrix.setOrtho(-20, 20, -20, 20, 1, 100);
            this.state = 0;
        }
        else if (this.state === 0) {
            this.projectionMatrix.setPerspective(40, canvas.width / canvas.height, 1, 100);
            this.state = 1;
        }
    }
}
