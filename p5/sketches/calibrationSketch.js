export class CalibrationSketch {
  constructor(p) {
    this.p = p;
    this.waves = [];
    this.blowCount = 0;
    this.countString = [];
    this.isBlowing = false;
    this.finishedBlowing = false;
    this.blowModule;

    p.setup = () => this.setup();
    p.draw = () => this.draw();
  }

  setup() {
    this.p.frameRate(10);
    const w = document.querySelector('#calibration-canvas').offsetWidth;
    this.p.createCanvas(w, 9 * CELL_SIZE);
    this.p.textAlign(this.p.CENTER);
    this.p.noStroke();
    this.p.fill(255, 0, 0);
    this.p.fill(0);
    this.p.textSize(CELL_SIZE);
    this.p.textFont('Courier New');
    this.p.text('🕯️', 0, CELL_SIZE, this.p.width, CELL_SIZE);
    this.p.text('✨️   ✨️', 0, 2 * CELL_SIZE, this.p.width, CELL_SIZE);
    this.p.text('🕯️      🕯️️', 0, 3 * CELL_SIZE, this.p.width, CELL_SIZE);
    this.p.text('✨️         ✨️', 0, 4 * CELL_SIZE, this.p.width, CELL_SIZE);
    this.p.text('🕯️      🕯️️', 0, 5 * CELL_SIZE, this.p.width, CELL_SIZE);
    this.p.text('✨️   ✨️', 0, 6 * CELL_SIZE, this.p.width, CELL_SIZE);
    this.p.text('🕯️', 0, 7 * CELL_SIZE, this.p.width, CELL_SIZE);
  }

  draw() {
    this.p.background(255);
    this.p.text('🕯️', 0, CELL_SIZE, this.p.width, CELL_SIZE);
    this.p.text('✨️   ✨️', 0, 2 * CELL_SIZE, this.p.width, CELL_SIZE);
    this.p.text('🕯️      🕯️️', 0, 3 * CELL_SIZE, this.p.width, CELL_SIZE);
    this.p.text('✨️         ✨️', 0, 4 * CELL_SIZE, this.p.width, CELL_SIZE);
    this.p.text('🕯️      🕯️️', 0, 5 * CELL_SIZE, this.p.width, CELL_SIZE);
    this.p.text('✨️   ✨️', 0, 6 * CELL_SIZE, this.p.width, CELL_SIZE);
    this.p.text('🕯️', 0, 7 * CELL_SIZE, this.p.width, CELL_SIZE);

    if (this.isBlowing) {
      this.waves.push(new BlowWave(this.p));
    }

    this.p.text(
      this.countString.join(''),
      0,
      4 * CELL_SIZE,
      this.p.width,
      CELL_SIZE
    );

    for (var i = this.waves.length - 1; i >= 0; i--) {
      const wave = this.waves[i];
      wave.show();
      wave.update();

      if (wave.isOut) {
        this.waves.splice(i, 1);
      }
    }

    if (
      this.finishedBlowing &&
      this.waves.length > 0 &&
      this.waves[this.waves.length - 1].y < 4 * CELL_SIZE
    ) {
      this.updateCount();
    }
  }

  updateCount() {
    this.countString = new Array(this.blowCount).fill('🕯️');
  }

  startBlow() {
    this.isBlowing = true;
    this.finishedBlowing = false;
  }

  endBlow() {
    if (this.isBlowing && !this.finishedBlowing) {
      this.isBlowing = false;
      this.finishedBlowing = true;
      this.blowCount++;
    }
  }
}
