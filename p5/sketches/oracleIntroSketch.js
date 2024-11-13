export class OracleIntroSketch {
  constructor(p) {
    this.p = p;
    this.streams = [];
    this.symbolSize = 14;
    this.chars = ['+', ' ', ' ', '⟡', '˚', '‧', '‧', ' ', ' '];

    p.setup = () => this.setup();
    p.draw = () => this.draw();
  }

  setup() {
    const w = document.querySelector('#intro-canvas').offsetWidth;
    const h = document.querySelector('#intro-canvas').offsetHeight;
    this.p.createCanvas(w, h);
    this.p.background(230, 50, 0);
  }

  draw() {}
}
