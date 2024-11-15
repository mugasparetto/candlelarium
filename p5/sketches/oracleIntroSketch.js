const symbolSize = 14;
const chars = ['+', ' ', ' ', '⟡', '˚', '‧', '‧', ' ', ' '];

export class OracleIntroSketch {
  constructor(p) {
    this.p = p;
    this.streams = [];

    p.setup = () => this.setup();
    p.draw = () => this.draw();
  }

  setup() {
    const w = document.querySelector('#intro-canvas').offsetWidth;
    const h = document.querySelector('#intro-canvas').offsetHeight;
    this.p.createCanvas(w, h);
    this.p.background(255);

    var x = 0;
    for (var i = 0; i <= this.p.width / symbolSize; i++) {
      const stream = new MyStream(this.p);
      stream.generateSymbols(x, this.p.round(this.p.random(0, -50)));
      this.streams.push(stream);
      x += symbolSize;
    }

    this.p.textFont('Consolas');
    this.p.textSize(symbolSize);
  }

  draw() {
    this.p.background(255);
    let shouldFinish = true;

    this.streams.forEach((stream) => {
      stream.render();
      if (stream.symbols[stream.symbols.length - 1].y <= this.p.height) {
        shouldFinish = false;
      }
    });

    if (shouldFinish) {
      this.finish();
    }
  }
}

class MyStream {
  constructor(p) {
    this.p = p;
    this.symbols = [];
    this.totalSymbols =
      this.p.ceil(this.p.height / symbolSize) +
      this.p.round(this.p.random(5, 20));
    this.speed = this.p.round(this.p.random(5, 6));
  }

  generateSymbols(x, y) {
    for (var i = 0; i <= this.totalSymbols; i++) {
      const symbol = new MySymbol(this.p, x, y, this.speed);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
    }
  }

  render() {
    this.symbols.forEach((symbol) => {
      this.p.fill(0);
      this.p.text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }
}

class MySymbol {
  constructor(p, x, y, speed) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.value;

    this.speed = speed;

    this.switchInterval = this.p.round(this.p.random(17, 25));
  }

  setToRandomSymbol() {
    if (this.p.frameCount % this.switchInterval == 0) {
      this.value = this.p.random(chars);
    }
  }

  rain() {
    this.y += this.speed;
  }
}
