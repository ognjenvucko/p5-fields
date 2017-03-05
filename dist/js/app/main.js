'use strict';

require(['p5', 'app/Cell', 'app/Field'], function (p5, Cell, Field) {

	var FORCE_MAG = 0.032;
	var NUM_OF_CELLS = 500;
	var MIDDLE_CELL_RADIUS = 80;

	var app = new p5(function (p) {

		var cells = [];
		var fields = [];

		var middleCell = new Cell(p, p.createVector(), MIDDLE_CELL_RADIUS);

		var pos = p.createVector();

		var middle = void 0;

		p.setup = function () {
			p.createCanvas(p.windowWidth - 20, p.windowHeight - 20);
			for (var i = 0; i < NUM_OF_CELLS; i++) {
				cells.push(new Cell(p, randomVect(p), 15));
			}
			middle = p.createVector(p.width / 2, p.height / 2);
		};

		p.draw = function () {
			p.background(50);
			p.translate(middle.x, middle.y);
			middleCell.updateAndDraw();
			fields.filter(function (field) {
				return field.active;
			}).forEach(function (field) {
				field.updateAndDraw();
			});
			pos.add(mouseVect(p).sub(middle).setMag(1.5).mult(-1));
			p.translate(pos.x, pos.y);
			var offset = pos.copy().mult(-1);
			cells.forEach(function (cell) {
				fields.filter(function (field) {
					return field.active && field.containsCell(offset, cell);
				}).forEach(function (field) {
					cell.applyForce(cell.pos.copy().sub(offset).setMag(FORCE_MAG));
				});
				cell.updateAndDraw();
			});
			p.mouseClicked = function () {
				fields.push(new Field(p, p.createVector()));
			};
		};
	});

	function randomVect(p) {
		return p.createVector(p.random(-3 * p.width, 3 * p.width), p.random(-3 * p.height, 3 * p.height));
	}

	function mouseVect(p) {
		return p.createVector(p.mouseX, p.mouseY);
	}
});