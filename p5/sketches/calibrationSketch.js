export class CalibrationSketch {
  constructor(p) {
    this.p = p;
    this.waves = [];
    this.blowCount = 0;
    this.countString = [];
    this.isBlowing = false;
    this.finishedBlowing = false;
    this.shouldFade = false;
    this.fade = 0;
    this.fadeFactor = 20;
    this.shouldInitialFade = true;
    this.initialFade = 255;
    this.initialDelay = 10;
    // TODO: change to 3
    this.maxBlowCount = 3;

    p.setup = () => this.setup();
    p.draw = () => this.draw();
  }

  setup() {
    this.p.frameRate(10);
    const w = document.querySelector('#calibration-canvas').offsetWidth;
    this.p.createCanvas(w, 9 * CELL_SIZE);
    this.p.textAlign(this.p.CENTER);
    this.p.noStroke();
    this.p.textSize(CELL_SIZE);
    this.p.textFont('Courier New');
    this.p.background(255);
  }

  draw() {
    this.p.background(255);

    if (this.p.frameCount > this.initialDelay) {
      this.p.fill(0);
      this.p.text('🕯️', 0, CELL_SIZE, this.p.width, CELL_SIZE);
      this.p.text('✨️   ✨️', 0, 2 * CELL_SIZE, this.p.width, CELL_SIZE);
      this.p.text('🕯️      🕯️️', 0, 3 * CELL_SIZE, this.p.width, CELL_SIZE);
      this.p.text('✨️         ✨️', 0, 4 * CELL_SIZE, this.p.width, CELL_SIZE);
      this.p.text('🕯️      🕯️️', 0, 5 * CELL_SIZE, this.p.width, CELL_SIZE);
      this.p.text('✨️   ✨️', 0, 6 * CELL_SIZE, this.p.width, CELL_SIZE);
      this.p.text('🕯️', 0, 7 * CELL_SIZE, this.p.width, CELL_SIZE);
    }

    if (this.isBlowing && !this.shouldInitialFade) {
      this.waves.push(new BlowWave(this.p));
    }

    this.p.text(this.countString, 0, 4 * CELL_SIZE, this.p.width, CELL_SIZE);
    if (this.shouldFade) {
      this.fade += this.fadeFactor;
      this.p.fill(255, this.fade);
      this.p.rect(this.p.width / 2 - 55, 3.5 * CELL_SIZE, 100, 2 * CELL_SIZE);

      if (this.fade > 255) {
        this.fadeFactor *= -1;
        this.countString = '🚪';
      }
      if (this.fade < 0) {
        const link = this.p.createA('#', '<small>~> enter the oracle</small>');
        link.addClass('enter-oracle');
        link.attribute('data-link', 'domains');
        spa.handleLinks();
        this.shouldFade = false;
      }
    }

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

    if (this.shouldInitialFade && this.p.frameCount > this.initialDelay) {
      this.p.fill(255, this.initialFade);
      this.p.rect(0, 0, this.p.width, this.p.height);
      this.initialFade -= 30;
      if (this.initialFade < 0) {
        this.shouldInitialFade = false;
        setTimeout(() => {
          if (this.blowCount === 0 && !this.isBlowing) {
            const span = this.p.createSpan(
              '<small>add more energy to unlock the way</small>'
            );
            span.addClass('calibration-hint');
            span.elt.style.opacity = 1;
          }
        }, 5000);
      }
    }
  }

  updateCount() {
    this.countString = new Array(this.blowCount).fill('🕯️').join('');
    if (this.blowCount >= this.maxBlowCount) {
      const minValue = Math.min(...calibrationBlows);
      BLOW_THRESHOLD = minValue > -10 ? -10 : minValue;
      setTimeout(() => {
        this.shouldFade = true;
      }, 700);
    }
  }

  startBlow() {
    if (this.blowCount < this.maxBlowCount) {
      this.isBlowing = true;
      this.finishedBlowing = false;
      const span = document.querySelector('.calibration-hint');
      if (span) {
        span.remove();
      }
    }
  }

  endBlow() {
    if (this.isBlowing && !this.finishedBlowing) {
      this.isBlowing = false;
      this.finishedBlowing = true;
      this.blowCount++;
    }
  }
}
