class Cell {
  constructor(p5, pos, radius) {
    this.p5 = p5;
    this.pos = pos;
    this.radius = radius;
    this.vel = p5.createVector();
    this.force = p5.createVector()
  }
  update() {
    this.vel.add(this.force);
    this.pos.add(this.vel);
    this.force.mult(0);
    this.vel.mult(0.994);
  }
  draw() {
    this.p5.fill(255);
    this.p5.ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
  }
  updateAndDraw() {
    this.update();
    this.draw();
  }
  applyForce(force) {
    this.force.add(force);
  }
}
