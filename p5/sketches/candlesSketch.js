export class CandlesSketch {
  constructor(p) {
    this.p = p;
    this.waves = [];
    this.shouldInitialFade = true;
    this.initialFade = 255;
    this.initialDelay = 3;
    this.isBlowing = false;
    this.finishedBlowing = false;
    this.blowCount = 0;
    this.maxBlowCount = 1;

    this.rows = 8;
    this.cols = 8;
    this.candles = [];

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

    const topPadding =
      this.p.height > 640
        ? 2.5 * CELL_SIZE + (this.p.height % CELL_SIZE)
        : 3.5 * CELL_SIZE + (this.p.height % CELL_SIZE);
    const leftPadding =
      (this.p.width - this.cols * CELL_SIZE) / 2 + CELL_SIZE / 2;
    const noiseLevel = 1.5 * HEALTH_FACTOR;
    let noiseScale = 1;

    for (var i = 0; i < this.cols; i++) {
      this.candles[i] = [];
      for (var j = 0; j < this.rows; j++) {
        const nx = noiseScale * i;
        const ny = noiseScale * j;
        const h = noiseLevel * this.p.noise(nx, ny);
        const y =
          this.p.height > 640
            ? topPadding + 2 * j * CELL_SIZE
            : topPadding + j * CELL_SIZE;

        this.candles[i].push(
          new Candle(
            this.p,
            leftPadding + i * CELL_SIZE,
            y,
            HEALTH_FACTOR / 2 + h
          )
        );
      }
    }
  }

  draw() {
    this.p.background(0);

    if (this.p.frameCount > this.initialDelay) {
      this.candles.forEach(function (row) {
        row.forEach(function (c) {
          c.show();
        });
      });
    }

    if (this.isBlowing && !this.shouldInitialFade) {
      this.waves.push(new BlowWave(this.p));
    }

    for (var i = this.waves.length - 1; i >= 0; i--) {
      const wave = this.waves[i];
      wave.show();
      wave.update();

      for (let y = 0; y < this.rows; y++) {
        if (this.candles[0][y].checkCollision(wave)) {
          for (let x = 0; x < this.cols; x++) {
            this.candles[x][y].calculateAttack(wave.strength);
          }
        }
      }

      if (wave.isOut) {
        this.waves.splice(i, 1);
      }
    }

    if (this.finishedBlowing) {
      if (this.waves.length > 0) {
        for (let y = 0; y < this.rows; y++) {
          if (
            this.candles[0][y].checkCollision(this.waves[this.waves.length - 1])
          ) {
            for (let x = 0; x < this.cols; x++) {
              this.candles[x][y].blowCandleOut();
            }
          }
        }
      } else {
        let blownOutCount = 0;
        for (let y = 0; y < this.rows; y++) {
          for (let x = 0; x < this.cols; x++) {
            if (this.candles[x][y].blownOut) blownOutCount++;
          }
        }
        if (blownOutCount > 0) {
          this.p.noLoop();
          console.log('acabou');
        } else {
          if (this.blowCount > 0) {
            this.blowCount--;
          }
        }
      }
    }

    if (this.shouldInitialFade && this.p.frameCount > this.initialDelay) {
      this.p.fill(0, this.initialFade);
      this.p.rect(
        this.p.width / 2,
        this.p.height / 2,
        this.p.width,
        this.p.height
      );
      this.initialFade -= 30;
      if (this.initialFade < 0) {
        this.shouldInitialFade = false;
      }
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
    }
  }
}
