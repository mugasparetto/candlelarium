class Candle {
  constructor(p, x, y, health, i, j) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.health = health;
    this.initialHealth = health;
    this.updateColor();
    this.blownOut = false;
    this.i = i;
    this.j = j;
    this.resetCount = 2 + Math.floor(this.p.random(4));
    this.p.textSize(9);
  }

  show() {
    if (!this.blownOut) {
      this.updateColor();
      this.p.fill(this.color);
      this.p.stroke(0);
      this.p.ellipse(this.x, this.y, CELL_SIZE, CELL_SIZE);
      this.p.fill(255);
      this.p.noStroke();
      this.p.text(Math.floor(this.health), this.x - 10, this.y - 3);
      this.p.text(`${this.i}; ${this.j}`, this.x - 10, this.y + 7);
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
      this.initialHealth =
        this.initialHealth - this.p.random(HEALTH_FACTOR / 4);
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
    const c = this.p.map(this.health, 0, 2 * HEALTH_FACTOR, 0, 255);
    this.color = this.p.color(0, c, 0);
  }
}
