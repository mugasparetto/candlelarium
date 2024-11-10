// pages/home.js
export function init() {
  // cleanin up home in here to prevent bugs
  document.querySelector('main').removeAttribute("style");
  document.querySelector('body').removeAttribute("style");
}

export function cleanup() {
}