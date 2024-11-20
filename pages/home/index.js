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
  const oracleReadingTime = localStorage.getItem('ORACLE_READING_TIME');

  console.log(dayjs().diff(oracleReadingTime, 'm', true));
}
