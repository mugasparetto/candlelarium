export async function init() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    document.querySelector('.home-art').style.left = '52.5%';
  }

  // MOCKED DATA:
  // domain = 'physical';
  // result = [
  //   [false, false, false, true, false, true, false, false],
  //   [false, false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, true, false],
  //   [false, false, true, false, false, false, false, false],
  //   [false, false, false, false, false, false, false, false],
  //   [false, true, false, false, false, false, true, false],
  //   [false, false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false, false],
  // ];

  try {
    const response = await fetch(
      'https://spontaneous-malasada-76fad8.netlify.app/.netlify/functions/getReading',
      {
        method: 'POST',
        body: JSON.stringify({ domain, result }),
      }
    );

    if (response.status === 200) {
      const data = await response.json();

      showReading(data.reading);
    } else {
      showReading(
        'the oracle is still looking for the proper answer. come back later.'
      );
    }
  } catch (error) {
    showReading(
      'the oracle is still looking for the proper answer. come back later.'
    );
    console.log(error);
  }
}

export function cleanup() {}

function showReading(content) {
  const div = document.createElement('div');
  div.classList.add('content');
  div.innerHTML = `<div class="reading">
  <span class="corner">✨</span>
  <span class="corner">✨</span>
  <span class="corner">✨</span>
  <span class="corner">✨</span>
  <small>${content}</small>
  </div>`;
  document.querySelector('#app').appendChild(div);
}
