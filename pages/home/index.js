// pages/home.js
export function init() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    document.querySelector('main').style.fontSize = '2.4vw';
  }

  if (/android/i.test(userAgent)) {
    document.querySelector('main').style.left = "54.5%";
  }
}

export function cleanup() {

}