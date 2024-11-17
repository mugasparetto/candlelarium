export class CandlesSketch {
  constructor(p) {
    this.p = p;
    this.waves = [];
    this.shouldInitialFade = true;
    this.initialFade = 0;
    this.initialDelay = 10;

    p.setup = () => this.setup();
    p.draw = () => this.draw();
  }

  setup() {
    this.p.frameRate(10);
    const w = document.querySelector('#candles-canvas').offsetWidth;
    const h = document.querySelector('#candles-canvas').offsetHeight;
    this.p.createCanvas(w, h);
    this.p.background(255);
    this.p.textAlign(this.p.CENTER);
    this.p.rectMode(this.p.CENTER);
    this.p.noStroke();
    this.p.textSize(CELL_SIZE - 5);
    this.p.textFont('Courier New');
  }

  draw() {
    this.p.background(255);

    if (this.shouldInitialFade && this.p.frameCount > this.initialDelay) {
      this.p.fill(0, this.initialFade);
      this.p.rect(
        this.p.width / 2,
        this.p.height / 2,
        this.p.width,
        this.p.height
      );
      this.initialFade += 30;
      if (this.initialFade > 255) {
        this.shouldInitialFade = false;
      }
    }

    if (!this.shouldInitialFade) {
      this.p.fill(0);
      this.p.rect(
        this.p.width / 2,
        this.p.height / 2,
        this.p.width,
        this.p.height
      );
    }
  }
}
