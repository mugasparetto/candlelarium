// pages/home.js
export function init() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    document.querySelector('body').style.fontSize = '2.4vw';
  }

  if (/android/i.test(userAgent)) {
    document.querySelector('main').style.left = "54.5%";
  }
}

export function cleanup() {
  document.querySelector('main').style.left = "50%";
  document.querySelector('body').style.fontSize = '1rem';
}