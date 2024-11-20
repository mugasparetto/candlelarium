export function init() {
  const oracleReadingTime = localStorage.getItem('ORACLE_READING_TIME');
  console.log(oracleReadingTime);
  const diff = dayjs().diff(oracleReadingTime, 'm', true);
  const hours = Math.ceil(24 - diff / 60);
  console.log(`less than ${hours} ${hours === 1 ? 'hour' : 'hours'}`);
}

export function cleanup() {}
