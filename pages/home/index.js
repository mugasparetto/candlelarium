// pages/home.js
export function init() {
  spa.handleLinks();
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    document.querySelector('.home-art').style.left = '52.5%';
  }
}

export function cleanup() {}
