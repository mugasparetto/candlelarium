// pages/oracle.js
let candlesSketch;

export async function init() {
  try {
    const module = await import(`../../p5/sketches/candlesSketch.js`);

    new p5(
      (p) => (candlesSketch = new module.CandlesSketch(p)),
      'candles-canvas'
    );

    document.addEventListener('signal', handleSignal);
    document.addEventListener('speechstop', handleBlowSucceeded);
    document.addEventListener('speechabort', handleAbortedBlow);
  } catch (error) {
    console.log(error);
  }
}

export function cleanup() {
  document.removeEventListener('signal', handleSignal);
  document.removeEventListener('speechstop', handleBlowSucceeded);
  document.removeEventListener('speechabort', handleAbortedBlow);
}

function handleSignal(event) {
  const dBV = dB(event.detail.volume);

  if (dBV >= BLOW_THRESHOLD) {
    candlesSketch.startBlow();
  }
}

function handleBlowSucceeded() {
  candlesSketch.endBlow();
}

function handleAbortedBlow() {
  candlesSketch.isBlowing = false;
  candlesSketch.showHint();
}
