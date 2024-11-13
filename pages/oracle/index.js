// pages/domains.js
export function init() {
  spa.handleLinks();
  console.log(domain);
  document.addEventListener('signal', handleSignal);
  document.addEventListener('speechstop', handleStop);
}

export function cleanup() {}

function handleSignal(event) {
  const dBV = dB(event.detail.volume);
  console.log(dBV);

  if (dBV >= BLOW_THRESHOLD) {
    document.querySelector('#debug').textContent = 'blow';
  }
}

function handleStop(event) {
  document.querySelector('#debug').textContent = 'not blow';
}
