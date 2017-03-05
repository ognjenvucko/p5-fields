define(function() {

  const MAX_RADIUS = 500;
  const LERP_FACTOR = 0.01;
  const FIELD_COLOR = 255;
  const FIELD_OPACITY = 50;

  return class Field {
    constructor(p5, pos) {
      this.p5 = p5;
      this.pos = pos;
      this.radius = 10;
      this.active = true;
    }
    update() {
      if (!this.active) {
        return;
      }
      this.radius = this.p5.lerp(this.radius, MAX_RADIUS, LERP_FACTOR);
      if (this.radius >= 0.85 * MAX_RADIUS) {
        this.active = false;
      }
    }
    draw() {
      this.p5.noStroke();
      this.p5.fill(FIELD_COLOR, FIELD_OPACITY);
      this.p5.ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }
    updateAndDraw() {
      this.update();
      this.draw();
    }
    containsCell(pos, cell) {
      var dist = cell.pos.dist(pos);
      return dist < this.radius / 2 - cell.radius / 2;
    }
  }

});
