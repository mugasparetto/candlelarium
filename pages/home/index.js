// pages/home.js
export function init() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    document.querySelector('.home-art').style.left = '52.5%';
  }

  document.querySelector('#proceed').addEventListener('click', goToNextScreen);
  document.querySelector('#about-btn').addEventListener('click', showAbout);
  document.querySelector('#about-btn').style.top = `${
    window.innerHeight - 32 - 16
  }px`;

  // Prevent Safari bug that scrolls page down (make it go up) after a while
  window.scrollTo(0, 0);
}

export function cleanup() {
  document
    .querySelector('#proceed')
    .removeEventListener('click', goToNextScreen);
  document.querySelector('#about-btn').removeEventListener('click', showAbout);
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

function showAbout(event) {
  event.preventDefault();
  const about = document.querySelector('#app');
  const backdrop = document.createElement('div');
  backdrop.classList.add('backdrop');

  backdrop.innerHTML =
    '<div class="about-content"><small>A portal to the unseen, Candlelarium is a web-based divination tool. It populates the internet with magic and invites seekers to uncover the wonders of possibility.<br /><br />Conjured by <a href="https://murilomakes.art/" target="_blank" onclick="event.stopPropagation();">Murilo Gasparetto</a></small></div>';
  backdrop.onclick = () => backdrop.classList.add('hidden');
  backdrop.ontransitionend = () => backdrop.remove();

  about.insertAdjacentElement('beforeend', backdrop);
}
