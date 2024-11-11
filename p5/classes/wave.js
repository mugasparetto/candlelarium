class BlowWave {
  constructor(p) {
    this.p = p;
    this.height = CELL_SIZE;
    this.width = this.p.width;
    this.y = this.p.height;
    this.isOut = false;
    this.strength = this.p.random(3);
  }

  show() {
    this.p.text('🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀', 0, this.y, this.width, this.height);
  }

  update() {
    this.y -= CELL_SIZE;

    if (this.y < -2 * CELL_SIZE) {
      this.isOut = true;
    }
  }
}
