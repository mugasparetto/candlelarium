class Candle {
  constructor(x, y, health, i, j) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.initialHealth = health;
    this.updateColor();
    this.blownOut = false;
    this.i = i;
    this.j = j;
    this.resetCount = 2 + Math.floor(random(4));
    textSize(9);
  }

  show() {
    if (!this.blownOut) {
      this.updateColor();
      fill(this.color);
      stroke(0);
      ellipse(this.x, this.y, CELL_SIZE, CELL_SIZE);
      fill(255);
      noStroke();
      text(Math.floor(this.health), this.x - 10, this.y - 3);
      text(`${this.i}; ${this.j}`, this.x - 10, this.y + 7);
    }
  }

  checkCollision(wave) {
    if (wave.y + CELL_SIZE / 2 === this.y) {
      // console.log("collision");
      return true;
    } else {
      return false;
    }
  }

  calculateAttack(strength) {
    this.health -= strength;
    if (this.health <= 0 && this.resetCount > 0) {
      this.initialHealth = this.initialHealth - random(HEALTH_FACTOR / 4);
      this.health = this.initialHealth;
      this.resetCount--;
    }
  }

  blowCandleOut() {
    if (this.health <= BLOWN_OUT_THRESHOLD) {
      this.blownOut = true;
    }
  }

  updateColor() {
    const c = map(this.health, 0, 2 * HEALTH_FACTOR, 0, 255);
    this.color = color(0, c, 0);
  }
}
