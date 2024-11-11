// pages/calibration.js
let calibrationSketch;

export function init() {
  // cleanin up home in here to prevent bugs
  document.querySelector('main').removeAttribute('style');
  document.querySelector('body').removeAttribute('style');

  document.querySelector('a').addEventListener('click', startCalibration);

  const volumeMeter = document.createElement('script');
  volumeMeter.src = './js/volume-meter.js';
  document.head.appendChild(volumeMeter);

  const audioDetectionConfig = document.createElement('script');
  audioDetectionConfig.src = './js/audioDetectionConfig.js';

  audioDetectionConfig.onload = () => {
    const audioDetection = document.createElement('script');
    audioDetection.src = './js/audioDetection.js';
    document.head.appendChild(audioDetection);
  };

  document.head.appendChild(audioDetectionConfig);

  const audioStream = document.createElement('script');
  audioStream.src = './js/audioStream.js';
  document.head.appendChild(audioStream);

  const p5 = document.createElement('script');
  p5.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.10.0/p5.js';
  document.head.appendChild(p5);
}

export function cleanup() {
  document.querySelector('a').removeEventListener('click', startCalibration);
  document.removeEventListener('signal', handleSignal);
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
      .then(async (stream) => {
        audioStream(stream);
        const link = document.querySelector('a');
        link.removeEventListener('click', startCalibration);
        link.remove();

        const div = document.querySelector('.calibration-cta');
        div.classList.add('higher');
        div.innerHTML =
          '<small>three breaths connect us deeper<br />each blow into the screen gets<br />you closer to the oracle</small>';

        const canvasWraper = document.createElement('div');
        canvasWraper.id = 'calibration-canvas';
        document
          .querySelector('.calibration-content')
          .appendChild(canvasWraper);

        const module = await import(`../../p5/sketches/calibrationSketch.js`);

        new p5(
          (p) => (calibrationSketch = new module.CalibrationSketch(p)),
          'calibration-canvas'
        );

        const blowClass = document.createElement('script');
        blowClass.src = '../../p5/classes/wave.js';
        document.head.appendChild(blowClass);

        const candleClass = document.createElement('script');
        candleClass.src = '../../p5/classes/candle.js';
        document.head.appendChild(candleClass);

        document.addEventListener('signal', handleSignal);
        document.addEventListener('speechstop', handleBlowSucceeded);
        document.addEventListener('speechabort', handleAbortedBlow);
      })
      .catch(didntGetStream);
  } catch (e) {
    alert('getUserMedia threw exception :' + e);
  }
}

function didntGetStream(error) {
  alert('Stream generation failed.');
  console.log(error);
}

function handleSignal(event) {
  const dBV = dB(event.detail.volume);
  if (dBV >= BLOW_THRESHOLD) {
    calibrationSketch.startBlow();
  }
}

function handleBlowSucceeded() {
  calibrationSketch.endBlow();
}

function handleAbortedBlow() {
  calibrationSketch.isBlowing = false;
}
