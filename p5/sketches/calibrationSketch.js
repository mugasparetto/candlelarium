export function sketch(p) {
  const CELL_SIZE = 30;
  const waves = [];
  var isBlowing = false;
  var button;
  var isBlowing = false;
  var finishedBlowing = false;
  var blowCount = 0;
  var countString = [];

  p.setup = function () {
    p.frameRate(10);
    const w = document.querySelector('#calibration-canvas').offsetWidth;
    p.createCanvas(w, 9 * CELL_SIZE);
    p.textAlign(p.CENTER);
    p.noStroke();
    p.fill(255, 0, 0);
    p.fill(0);
    p.textSize(CELL_SIZE);
    p.textFont('Courier New');
    p.text('🕯️', 0, CELL_SIZE, p.width, CELL_SIZE);
    p.text('✨️   ✨️', 0, 2 * CELL_SIZE, p.width, CELL_SIZE);
    p.text('🕯️      🕯️️', 0, 3 * CELL_SIZE, p.width, CELL_SIZE);
    p.text('✨️         ✨️', 0, 4 * CELL_SIZE, p.width, CELL_SIZE);
    p.text('🕯️      🕯️️', 0, 5 * CELL_SIZE, p.width, CELL_SIZE);
    p.text('✨️   ✨️', 0, 6 * CELL_SIZE, p.width, CELL_SIZE);
    p.text('🕯️', 0, 7 * CELL_SIZE, p.width, CELL_SIZE);
    button = p.createButton('blow');
    button.position(p.width / 2 - 25, p.height + 25);
    button.mousePressed(startBlow);
    button.mouseReleased(endBlow);
  };

  p.draw = function () {
    p.background(255);
    p.text('🕯️', 0, CELL_SIZE, p.width, CELL_SIZE);
    p.text('✨️   ✨️', 0, 2 * CELL_SIZE, p.width, CELL_SIZE);
    p.text('🕯️      🕯️️', 0, 3 * CELL_SIZE, p.width, CELL_SIZE);
    p.text('✨️         ✨️', 0, 4 * CELL_SIZE, p.width, CELL_SIZE);
    p.text('🕯️      🕯️️', 0, 5 * CELL_SIZE, p.width, CELL_SIZE);
    p.text('✨️   ✨️', 0, 6 * CELL_SIZE, p.width, CELL_SIZE);
    p.text('🕯️', 0, 7 * CELL_SIZE, p.width, CELL_SIZE);

    if (isBlowing) {
      waves.push(new BlowWave());
    }

    p.text(countString.join(''), 0, 4 * CELL_SIZE, p.width, CELL_SIZE);

    for (var i = waves.length - 1; i >= 0; i--) {
      const wave = waves[i];
      wave.show();
      wave.update();

      if (wave.isOut) {
        waves.splice(i, 1);
      }
    }

    if (
      finishedBlowing &&
      waves.length > 0 &&
      waves[waves.length - 1].y < 3 * CELL_SIZE
    ) {
      updateCount();
    }
  };

  function updateCount() {
    countString = new Array(blowCount).fill('🕯️');
  }

  function startBlow() {
    isBlowing = true;
    finishedBlowing = false;
  }

  function endBlow() {
    isBlowing = false;
    finishedBlowing = true;
    blowCount++;
  }
}
