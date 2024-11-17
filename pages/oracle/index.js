// pages/oracle.js
let candlesSketch;

export function init() {
  spa.handleLinks();
  document.querySelector('a').addEventListener('click', startCandles);
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
