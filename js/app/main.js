require(['p5', 'app/Cell', 'app/Field'], function(p5, Cell, Field) {

	const FORCE_MAG = 0.012;
	const NUM_OF_CELLS = 500;
	const MIDDLE_CELL_RADIUS = 80;

	var app = new p5((p) => {

		let cells = [];
		let fields = [];

		let middleCell = new Cell(p, p.createVector(), MIDDLE_CELL_RADIUS);

		let pos = p.createVector();

		let middle;

		p.setup = () => {
			p.createCanvas(700, 450);
			for (var i = 0; i < NUM_OF_CELLS; i++) {
				cells.push(new Cell(p, randomVect(), 15));
			}
			middle = p.createVector(p.width / 2, p.height / 2);
		}

		p.draw = () => {
			p.background(50);
			p.translate(middle.x, middle.y);
			middleCell.updateAndDraw();
			fields.filter((field) => {
				return field.active;
			}).forEach((field) => {
				field.updateAndDraw();
			});
			pos.add(mouseVect().sub(middle).setMag(1).mult(-1));
			p.translate(pos.x, pos.y);
			let offset = pos.copy().mult(-1);
			cells.forEach((cell) => {
				fields.filter((field) => {
					return field.active && field.containsCell(offset, cell);
				}).forEach((field) => {
					cell.applyForce(cell.pos.copy().sub(offset).setMag(FORCE_MAG));
				});
				cell.updateAndDraw();
			});
			p.mouseClicked = () => {
				fields.push(new Field(p, p.createVector()));
			}

		}

		this.randomVect = () => {
			return p.createVector(p.random(-3 * p.width, 3 * p.width), p.random(-3 * p.height, 3 * p.height));
		}

		this.mouseVect = () => {
			return p.createVector(p.mouseX, p.mouseY);
		}
	});

});
