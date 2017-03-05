"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(function () {

  var CELL_COLOR = 255;
  var VELOCITY_DROP_FACTOR = 0.994;

  return function () {
    function Cell(p5, pos, radius) {
      _classCallCheck(this, Cell);

      this.p5 = p5;
      this.pos = pos;
      this.radius = radius;
      this.vel = p5.createVector();
      this.force = p5.createVector();
    }

    _createClass(Cell, [{
      key: "update",
      value: function update() {
        this.vel.add(this.force);
        this.pos.add(this.vel);
        this.force.mult(0);
        this.vel.mult(VELOCITY_DROP_FACTOR);
      }
    }, {
      key: "draw",
      value: function draw() {
        this.p5.noStroke();
        this.p5.fill(CELL_COLOR);
        this.p5.ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
      }
    }, {
      key: "updateAndDraw",
      value: function updateAndDraw() {
        this.update();
        this.draw();
      }
    }, {
      key: "applyForce",
      value: function applyForce(force) {
        this.force.add(force);
      }
    }]);

    return Cell;
  }();
});