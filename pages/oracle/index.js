// pages/oracle.js
let introSketch;
let candlesSketch;

export async function init() {
  spa.handleLinks();

  const canvasWraper = document.createElement('div');
  canvasWraper.id = 'intro-canvas';
  document.querySelector('.content').appendChild(canvasWraper);

  try {
    const module = await import(`../../p5/sketches/oracleIntroSketch.js`);

    new p5(
      (p) => (introSketch = new module.OracleIntroSketch(p)),
      'intro-canvas'
    );
    introSketch.finish = () => {
      canvasWraper.remove();
    };

    introSketch.showPoem = () => {
      const newDiv = document.createElement('div');
      newDiv.classList.add('poem');
      newDiv.style.animation = 'fadeIn 1s';
      newDiv.innerHTML =
        '<small>gather your focus, let it go,<br />through the flame, the answer will grow<br />push your energy into the air,<br />the oracle is here and ready to share<br />when the candles fade, the time is near,<br /><a href="#">blow them out to make it clear</a></small>';
      document
        .querySelector('.content')
        .insertAdjacentElement('beforeend', newDiv);

      document.querySelector('a').addEventListener('click', startCandles);
    };
  } catch (error) {
    console.log(error);
  }
}

export function cleanup() {
  document.querySelector('a').removeEventListener('click', startCandles);
}

async function startCandles(event) {
  event.preventDefault();

  document.querySelector('.poem').style.opacity = 0;

  const canvasWraper = document.createElement('div');
  canvasWraper.id = 'candles-canvas';
  document.querySelector('.content').appendChild(canvasWraper);

  try {
    const module = await import(`../../p5/sketches/candlesSketch.js`);

    new p5(
      (p) => (candlesSketch = new module.CandlesSketch(p)),
      'candles-canvas'
    );
  } catch (error) {
    console.log(error);
  }
}
