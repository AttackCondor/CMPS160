/**
 * Specifies a vertex. Currently only contains the vertex's position.
 *
 * @author Lucas N. Ferreira
 * @this {Vertex}
 */
class Vertex {
  constructor(x, y, z, color) {
    this.point = new Vector3([x, y, z]);
    if (color) {
      color = color.map(x => x / 255);
      this.color = [color[0], color[1], color[2], 1.0];
    }
    else this.color = [Math.random(), Math.random(), Math.random()];
    // This class can be extended to support other attributes such as
    // normals and UV coordinates.
  }
}
