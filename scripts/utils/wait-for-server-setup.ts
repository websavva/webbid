import flatry from 'await-to-js';

async function fetchWithTimeout(url: string | URL, timeout: number = 5e3) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, {
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
}

export const waitForServerSetup = (
  url: string | URL,
  {
    requestTimeout = 1e3,
    timeout = 10e3,
    interval = 2e3,
  }: {
    timeout?: number;
    interval?: number;
    requestTimeout?: number;
  } = {},
) => {
  const startTime = Date.now();

  if (requestTimeout >= interval)
    throw new Error('requestTimeout should be shorter than interval');

  return new Promise<void>((resolve, reject) => {
    async function sendRequest() {
      const [err, response] = await flatry(
        fetchWithTimeout(url, requestTimeout),
      );

      if (err) {
        if (Date.now() - startTime >= timeout) {
          reject(new Error(`Timeout has been exceeded: ${url}`));
        } else {
          setTimeout(sendRequest, interval);
        }
      } else {
        const text = await response.text();
        if (response.status !== 200 || text !== 'ok') {
          reject(
            new Error(
              `Response was not successful [${url} - status ${response.status}]`,
            ),
          );
        } else {
          console.log({
            text,
          });

          resolve();
        }
      }
    }

    sendRequest();
  });
};
