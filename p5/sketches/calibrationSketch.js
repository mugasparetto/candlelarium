export class CalibrationSketch {
  constructor(p) {
    this.p = p;
    this.waves = [];
    this.blowCount = 0;
    this.countString = [];
    this.isBlowing = false;
    this.finishedBlowing = false;
    this.shouldFade = false;
    this.fade = 255;
    this.fadeFactor = -20;
    // TODO: change to 3
    this.maxBlowCount = 1;

    p.setup = () => this.setup();
    p.draw = () => this.draw();
  }

  setup() {
    this.p.frameRate(10);
    const w = document.querySelector('#calibration-canvas').offsetWidth;
    this.p.createCanvas(w, 9 * CELL_SIZE);
    this.p.textAlign(this.p.CENTER);
    this.p.noStroke();
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
    this.p.fill(0);
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

    if (this.shouldFade) {
      this.fade += this.fadeFactor;
      this.p.fill(0, this.fade);
      if (this.fade < 0) {
        this.fadeFactor *= -1;
        this.countString = '🚪';
      }
      if (this.fade > 260) {
        const link = this.p.createA('#', '<small>enter the oracle</small>');
        link.addClass('enter-oracle');
        link.attribute('data-link', 'domains');
        link.position(this.p.width - 100, CELL_SIZE);
        spa.handleLinks();
        this.shouldFade = false;
      }
    } else {
      this.p.fill(0);
    }
    this.p.text(this.countString, 0, 4 * CELL_SIZE, this.p.width, CELL_SIZE);

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
    this.countString = new Array(this.blowCount).fill('🕯️').join('');
    if (this.blowCount >= this.maxBlowCount) {
      setTimeout(() => {
        this.shouldFade = true;
      }, 1000);
    }
  }

  startBlow() {
    if (this.blowCount < this.maxBlowCount) {
      this.isBlowing = true;
      this.finishedBlowing = false;
    }
  }

  endBlow() {
    if (this.isBlowing && !this.finishedBlowing) {
      this.isBlowing = false;
      this.finishedBlowing = true;
      this.blowCount++;

      if (this.blowCount >= this.maxBlowCount) {
        setTimeout(() => {}, 2000);
      }
    }
  }
}
