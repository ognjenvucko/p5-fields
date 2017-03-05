define(function() {

  const CELL_COLOR = 255;
  const VELOCITY_DROP_FACTOR = 0.994;

  return class Cell {
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
      this.vel.mult(VELOCITY_DROP_FACTOR);
    }
    draw() {
      this.p5.noStroke();
      this.p5.fill(CELL_COLOR);
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
});
