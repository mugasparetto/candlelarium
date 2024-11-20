// pages/home.js
export function init() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    document.querySelector('.home-art').style.left = '52.5%';
  }

  document.querySelector('a').addEventListener('click', goToNextScreen);
}

export function cleanup() {
  document.querySelector('a').removeEventListener('click', goToNextScreen);
}

function goToNextScreen(event) {
  event.preventDefault();
  const storedOracle = JSON.parse(localStorage.getItem('CANDLELARIUM_ORACLE'));

  if (storedOracle && storedOracle.readingTime) {
    const diff = dayjs().diff(storedOracle.readingTime, 'm');
    if (diff >= 1440) {
      spa.navigate('calibration');
    } else {
      spa.navigate('wait');
    }
  } else {
    spa.navigate('calibration');
  }
}
