// pages/home.js
export function init() {
  // cleanin up home in here to prevent bugs
  document.querySelector('main').style.left = "50%";
  document.querySelector('body').style.fontSize = '1rem';
}

export function cleanup() {
}