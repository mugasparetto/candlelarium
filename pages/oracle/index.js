// pages/oracle.js
let candlesSketch;

export async function init() {
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

export function cleanup() {}
