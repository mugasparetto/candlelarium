class Candle {
  constructor(p, x, y, health) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.health = health;
    this.initialHealth = health;
    this.blownOut = false;
    this.resetCount = 1 + Math.floor(this.p.random(3));
    this.twistFade = 0;
    this.fadeFactor = 300;
    this.twisted = false;

    this.p.noFill();
    this.p.textSize(CELL_SIZE - 5);
    this.p.text('🕯️', this.width / 2, this.y);
    this.a = this.p.textAscent();
  }

  show() {
    this.p.textAlign(this.p.CENTER, this.p.BASELINE);
    if (!this.blownOut) {
      this.p.fill(255);
      this.p.textSize(CELL_SIZE - 5);
      this.p.text('🕯️', this.x, this.y + 0.45 * this.a);
    } else {
      this.p.fill(255);
      this.p.textSize(CELL_SIZE - 5);
      this.p.text('🕯️', this.x, this.y + 0.45 * this.a);
      this.p.fill(0, 204);
      this.p.ellipse(this.x, this.y, CELL_SIZE, CELL_SIZE);
    }

    if (this.isTwisting) {
      this.p.fill(0, this.twistFade);
      this.p.ellipse(this.x, this.y, CELL_SIZE, CELL_SIZE);
      const scaleFactor = this.p.abs(
        this.p.sin((this.p.millis() - this.timeTwist) * 0.0015)
      );

      this.p.textSize((CELL_SIZE - 5) * scaleFactor);
      this.p.fill(0);
      this.p.textAlign(this.p.CENTER, this.p.CENTER);
      if (
        this.fadeFactor < 0 &&
        this.twistFade < 0 &&
        scaleFactor >= 0 &&
        scaleFactor <= 0.2
      ) {
      } else {
        this.p.text(
          `${this.twist === 'kill' ? '🌀' : '🔥'}`,
          this.x,
          this.y + 0.05 * this.a
        );
      }

      if (
        (this.fadeFactor > 0 && this.twistFade < 255) ||
        (this.twistFade >= 0 && this.fadeFactor < 0)
      ) {
        this.twistFade += (this.fadeFactor * this.p.deltaTime) / 1000;
      }
      if (
        this.fadeFactor < 0 &&
        this.twistFade < 0 &&
        scaleFactor >= 0 &&
        scaleFactor <= 0.2
      ) {
        this.parentCallback();
        this.isTwisting = false;
      }
      if (this.p.millis() - this.timeTwist >= 4.5 * 1000) {
        this.fadeFactor = -220;
      }
      if (this.p.millis() - this.timeTwist >= 1000 && !this.twisted) {
        this.twisted = true;
        this.blownOut = !this.blownOut;
      }
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

  twistTo(state, callback) {
    this.twist = state;
    this.isTwisting = true;
    this.timeTwist = this.p.millis();
    this.parentCallback = callback;
  }
}
