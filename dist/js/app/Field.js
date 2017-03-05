"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(function () {

  var MAX_RADIUS = 500;
  var LERP_FACTOR = 0.01;
  var FIELD_COLOR = 255;
  var FIELD_OPACITY = 50;

  return function () {
    function Field(p5, pos) {
      _classCallCheck(this, Field);

      this.p5 = p5;
      this.pos = pos;
      this.radius = 10;
      this.active = true;
    }

    _createClass(Field, [{
      key: "update",
      value: function update() {
        if (!this.active) {
          return;
        }
        this.radius = this.p5.lerp(this.radius, MAX_RADIUS, LERP_FACTOR);
        if (this.radius >= 0.85 * MAX_RADIUS) {
          this.active = false;
        }
      }
    }, {
      key: "draw",
      value: function draw() {
        this.p5.noStroke();
        this.p5.fill(FIELD_COLOR, FIELD_OPACITY);
        this.p5.ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
      }
    }, {
      key: "updateAndDraw",
      value: function updateAndDraw() {
        this.update();
        this.draw();
      }
    }, {
      key: "containsCell",
      value: function containsCell(pos, cell) {
        var dist = cell.pos.dist(pos);
        return dist < this.radius / 2 - cell.radius / 2;
      }
    }]);

    return Field;
  }();
});