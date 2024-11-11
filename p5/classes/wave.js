class BlowWave {
  constructor() {
    this.height = CELL_SIZE;
    this.width = width;
    this.y = height - 3 * CELL_SIZE;
    this.isOut = false;
    this.strength = random(3);
  }

  show() {
    text("🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀🌀", 0, this.y, this.width, this.height);
  }

  update() {
    this.y -= CELL_SIZE;

    if (this.y < -2 * CELL_SIZE) {
      this.isOut = true;
    }
  }
}
