var app = new p5((p) => {

	let cells = [];
	let fields = [];

	let middleCell = new Cell(p, p.createVector(), 80);

	let pos = p.createVector();

	let middle;

	p.setup = () => {
		p.createCanvas(700, 450);
		for (var i = 0; i < 500; i++) {
			cells.push(new Cell(p, randomVect(), 15));
		}
		//cells.push(new Cell(p, p.createVector(100, 100), 15));
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
		cells.forEach((cell) => {
			fields.filter((field) => {
				return field.active;
			}).forEach((field) => {
				let fieldPos = pos.copy().mult(-1);
				let dist = cell.pos.dist(fieldPos);
				if (dist < cell.radius / 2 + field.radius / 2) {
					cell.applyForce(cell.pos.copy().sub(fieldPos).setMag(0.012));
				}
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