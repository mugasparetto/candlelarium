export async function init() {
  try {
    const response = await fetch(
      'http://localhost:8888/.netlify/functions/hello',
      {
        method: 'POST',
        body: JSON.stringify({ domain }),
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export function cleanup() {}
