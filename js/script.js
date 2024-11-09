document.addEventListener('DOMContentLoaded', (event) => {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    document.querySelector('body').style.fontSize = '2.4vw';
  }

  if (/android/i.test(userAgent)) {
    document.querySelector('main').style.left = "54.5%";
  }

});
