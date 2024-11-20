export function init() {
  document.addEventListener('signal', handleSignal);
}

export function cleanup() {
  document.removeEventListener('signal', handleSignal);
  document
    .querySelector('.content')
    .removeEventListener('transitionend', navigateToHome);
}

function navigateToHome(event) {
  if (event.propertyName === 'visibility') spa.navigate('home');
}

function handleSignal(event) {
  const dBV = dB(event.detail.volume);

  if (dBV >= BLOW_THRESHOLD) {
    document.removeEventListener('signal', handleSignal);
    document.querySelector('.content').classList.add('hidden');
    document
      .querySelector('.content')
      .addEventListener('transitionend', navigateToHome);
  }
}
