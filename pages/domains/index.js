// pages/domains.js
let introSketch;

export async function init() {
  spa.handleLinks();

  try {
    const module = await import(`../../p5/sketches/oracleIntroSketch.js`);

    new p5(
      (p) => (introSketch = new module.OracleIntroSketch(p)),
      'intro-canvas'
    );
    introSketch.finish = () => {
      document.querySelector('#intro-canvas').remove();
      document.querySelector('.header').style.animation = 'fadeIn 1s';
      document.querySelector('.domains').style.animation = 'fadeIn 1s';
      document.querySelector('body').classList.add('dark');
    };
  } catch (error) {}
}

export function cleanup() {}
