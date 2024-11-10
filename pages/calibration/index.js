// pages/calibration.js
export function init() {
  // cleanin up home in here to prevent bugs
  document.querySelector('main').removeAttribute('style');
  document.querySelector('body').removeAttribute('style');

  document.querySelector('a').addEventListener('click', startCalibration);
}

export function cleanup() {
  document.querySelector('a').removeEventListener('click', startCalibration);
}

function startCalibration(event) {
  event.preventDefault();
  // grab an audio context
  audioContext.resume();

  // Attempt to get audio input
  try {
    // ask for an audio input
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          mandatory: {
            googEchoCancellation: 'false',
            googAutoGainControl: 'false',
            googNoiseSuppression: 'false',
            googHighpassFilter: 'false',
          },
          optional: [],
        },
      })
      .then((stream) => {
        audioStream(stream);
        const link = document.querySelector('a');
        link.removeEventListener('click', startCalibration);
        link.remove();

        const div = document.querySelector('.calibration-cta');
        div.style.top = '40%';
        div.innerHTML =
          '<small>three breaths connect us deeper<br />each blow into the screen gets<br />you closer to the oracle</small>';

        const canvasWraper = document.createElement('div');
        canvasWraper.id = 'calibration-canvas';
        document
          .querySelector('.calibration-content')
          .appendChild(canvasWraper);

        new p5(function (p) {
          p.setup = function () {
            p.createCanvas(canvasWraper.offsetWidth, canvasWraper.offsetHeight);
          };

          p.draw = function () {
            p.background(230);
            p.text(p.width, 10, 10);
          };
        }, 'calibration-canvas');
      })
      .catch(didntGetStream);
  } catch (e) {
    alert('getUserMedia threw exception :' + e);
  }
}

function didntGetStream() {
  alert('Stream generation failed.');
}
