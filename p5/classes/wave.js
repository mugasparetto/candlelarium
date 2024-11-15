class BlowWave {
  constructor(p) {
    this.p = p;
    this.height = CELL_SIZE;
    this.width = this.p.width;
    this.y = this.p.height;
    this.isOut = false;
    this.strength = this.p.random(3);
    this.p.noFill();
    this.p.text('🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀', this.width / 2, this.y);
    this.a = this.p.textAscent();
  }

  show() {
    this.p.fill(0);
    this.p.text(
      '🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀',
      this.p.width / 2,
      this.y - 0.5 * CELL_SIZE + 0.45 * this.a
    );
  }

  update() {
    this.y -= CELL_SIZE;

    if (this.y < -2 * CELL_SIZE) {
      this.isOut = true;
    }
  }
}
