// pages/calibration.js
let calibrationSketch;
let maxDB = -40;
let sketchModule;

export async function init() {
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
  p5.src = './js/p5.min.js';
  document.head.appendChild(p5);

  const blowClass = document.createElement('script');
  blowClass.src = '../../p5/classes/wave.js';
  document.head.appendChild(blowClass);

  const candleClass = document.createElement('script');
  candleClass.src = '../../p5/classes/candle.js';
  document.head.appendChild(candleClass);

  try {
    sketchModule = await import(`../../p5/sketches/calibrationSketch.js`);
  } catch (error) {
    alert(error);
  }
}

export function cleanup() {
  document.querySelector('a').removeEventListener('click', startCalibration);
  document.removeEventListener('signal', handleSignal);
  document.removeEventListener('speechstop', handleBlowSucceeded);
  document.removeEventListener('speechabort', handleAbortedBlow);
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
        appStream = stream;

        const link = document.querySelector('a');
        link.removeEventListener('click', startCalibration);

        const oldDiv = document.querySelector('#initial-cta');
        oldDiv.style.opacity = 0;
        oldDiv.addEventListener('transitionend', addCanvas);

        function addCanvas() {
          oldDiv.removeEventListener('transitionend', addCanvas);
          oldDiv.remove();

          const newDiv = document.createElement('div');
          newDiv.classList.add('calibration-cta');
          newDiv.classList.add('higher');
          newDiv.style.animation = 'fadeIn 1s';
          newDiv.innerHTML =
            '<small>together, we will fortify our link<br />three blows into the microphone gets<br />you closer to the oracle</small>';
          document.querySelector('.content').appendChild(newDiv);

          const canvasWraper = document.createElement('div');
          canvasWraper.id = 'calibration-canvas';
          document.querySelector('.content').appendChild(canvasWraper);

          new p5(
            (p) => (calibrationSketch = new sketchModule.CalibrationSketch(p)),
            'calibration-canvas'
          );

          document.addEventListener('signal', handleSignal);
          document.addEventListener('speechstop', handleBlowSucceeded);
          document.addEventListener('speechabort', handleAbortedBlow);
        }
      })
      .catch(didntGetStream);
  } catch (e) {
    alert('getUserMedia threw exception :' + e);
  }
}

function didntGetStream(error) {
  alert('Something went wrong. Please try with a different browser.');
  console.log(error);
}

function handleSignal(event) {
  const dBV = dB(event.detail.volume);
  if (dBV > maxDB) {
    maxDB = dBV;
  }

  if (dBV >= BLOW_THRESHOLD) {
    calibrationSketch.startBlow();
  }
}

function handleBlowSucceeded() {
  calibrationSketch.endBlow();
  calibrationBlows.push(maxDB);
  maxDB = -40;
}

function handleAbortedBlow() {
  if (calibrationSketch.blowCount < calibrationSketch.maxBlowCount) {
    calibrationSketch.isBlowing = false;
    calibrationSketch.showHint();
  }
}
