// pages/oracle.js
let introSketch;

export async function init() {
  spa.handleLinks();

  const canvasWraper = document.createElement('div');
  canvasWraper.id = 'intro-canvas';
  document.querySelector('.content').appendChild(canvasWraper);

  try {
    const module = await import(`../../p5/sketches/oracleIntroSketch.js`);

    new p5(
      (p) => (introSketch = new module.OracleIntroSketch(p)),
      'intro-canvas'
    );
  } catch (error) {
    alert(error);
  }
}

export function cleanup() {}
