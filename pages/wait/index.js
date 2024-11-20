export function init() {
  const oracleReadingTime = localStorage.getItem('ORACLE_READING_TIME');
  const diff = dayjs().diff(oracleReadingTime, 'm', true);
  const hours = Math.ceil(24 - diff / 60);
  document.querySelector('#wait-time').textContent = `allow it about ${hours} ${
    hours === 1 ? 'hour' : 'hours'
  } to gather its strength`;
}

export function cleanup() {}
