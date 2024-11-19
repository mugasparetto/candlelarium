export async function init() {
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
    const data = await response.json();
    document.querySelector('#debug').textContent = data.reading;
    console.log(data.reading);
  } catch (error) {
    document.querySelector('#debug').textContent = error;
    console.log(error);
  }
}

export function cleanup() {}
