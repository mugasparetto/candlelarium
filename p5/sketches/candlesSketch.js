export class CandlesSketch {
  constructor(p) {
    this.p = p;
    this.waves = [];
    this.ascents = {};

    p.setup = () => this.setup();
    p.draw = () => this.draw();
  }

  setup() {
    this.p.frameRate(10);
    const w = document.querySelector('#candles-canvas').offsetWidth;
    const h = document.querySelector('#candles-canvas').offsetHeight;
    this.p.createCanvas(w, h);
    this.p.background(0);
    this.p.textAlign(this.p.CENTER);
    this.p.rectMode(this.p.CENTER);
    this.p.noStroke();
    this.p.textSize(CELL_SIZE - 5);
    this.p.textFont('Courier New');

    this.p.noFill();
    this.p.text('🕯️', this.width / 2, 1.5 * CELL_SIZE);
    this.ascents.candle = this.p.textAscent();
  }

  draw() {
    this.p.background(0);

    this.p.fill(0);
    this.p.text(
      '🕯️  🕯️  🕯️  🕯️  🕯️  🕯️  🕯️  🕯️',
      this.p.width / 2,
      5.5 * CELL_SIZE + 0.45 * this.ascents.candle
    );
    this.p.text(
      '🕯️  🕯️  🕯️  🕯️  🕯️  🕯️  🕯️  🕯️',
      this.p.width / 2,
      7.5 * CELL_SIZE + 0.45 * this.ascents.candle
    );
    this.p.text(
      '🕯️  🕯️  🕯️  🕯️  🕯️  🕯️  🕯️  🕯️',
      this.p.width / 2,
      9.5 * CELL_SIZE + 0.45 * this.ascents.candle
    );
    this.p.text(
      '🕯️  🕯️  🕯️  🕯️  🕯️  🕯️  🕯️  🕯️',
      this.p.width / 2,
      11.5 * CELL_SIZE + 0.45 * this.ascents.candle
    );
    this.p.text(
      '🕯️  🕯️  🕯️  🕯️  🕯️  🕯️  🕯️  🕯️',
      this.p.width / 2,
      13.5 * CELL_SIZE + 0.45 * this.ascents.candle
    );
    this.p.text(
      '🕯️  🕯️  🕯️  🕯️  🕯️  🕯️  🕯️  🕯️',
      this.p.width / 2,
      15.5 * CELL_SIZE + 0.45 * this.ascents.candle
    );
    this.p.text(
      '🕯️  🕯️  🕯️  🕯️  🕯️  🕯️  🕯️  🕯️',
      this.p.width / 2,
      17.5 * CELL_SIZE + 0.45 * this.ascents.candle
    );
    this.p.text(
      '🕯️  🕯️  🕯️  🕯️  🕯️  🕯️  🕯️  🕯️',
      this.p.width / 2,
      19.5 * CELL_SIZE + 0.45 * this.ascents.candle
    );
  }
}
