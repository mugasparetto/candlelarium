class BlowWave {
  constructor(p) {
    this.p = p;
    this.height = CELL_SIZE;
    this.width = this.p.width;
    this.y = this.p.height + 1.5 * CELL_SIZE;
    this.isOut = false;
    this.strength = this.p.random(3);
  }

  show() {
    this.p.text('🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀', this.p.width / 2, this.y);
  }

  update() {
    this.y -= CELL_SIZE;

    if (this.y < -1.5 * CELL_SIZE) {
      this.isOut = true;
    }
  }
}
