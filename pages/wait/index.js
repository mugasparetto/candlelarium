export function init() {
  const { readingTime, lastReading } = JSON.parse(
    localStorage.getItem('CANDLELARIUM_ORACLE')
  );

  const diff = dayjs().diff(readingTime, 'm', true);
  const hours = Math.ceil(24 - diff / 60);
  document.querySelector('#wait-time').innerHTML = `allow it about ${hours} ${
    hours === 1 ? 'hour' : 'hours'
  }<br />to gather its strength`;

  const div = document.createElement('div');
  div.classList.add('reading');
  div.classList.add('last');
  div.innerHTML = `
  <span class="corner">✨</span>
  <span class="corner">✨</span>
  <span class="corner">✨</span>
  <span class="corner">✨</span>
  <small class="title">your last reading</small>
  <small>${lastReading}</small>`;
  document.querySelector('.content').appendChild(div);
}

export function cleanup() {}
