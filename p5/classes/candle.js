class Candle {
  constructor(p, x, y, health) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.health = health;
    this.initialHealth = health;
    this.updateColor();
    this.blownOut = false;
    this.resetCount = 2 + Math.floor(this.p.random(4));

    this.p.noFill();
    this.p.text('🕯️', this.width / 2, this.y);
    this.a = this.p.textAscent();
  }

  show() {
    if (!this.blownOut) {
      this.p.fill(255);
      // this.p.textSize(CELL_SIZE - 5);
      this.p.text('🕯️', this.x, this.y + 0.45 * this.a);
      // this.p.fill(255);
      // this.p.textSize(12);
      // this.p.text(Math.floor(this.health), this.x - 10, this.y - 3);
    } else {
      this.p.fill(255, 51);
      // this.p.textSize(CELL_SIZE - 5);
      this.p.text('🕯️', this.x, this.y + 0.45 * this.a);
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
