import ZktlsReactnativeCoreSdk from './NativeZktlsReactnativeCoreSdk';

async function callAlgorithm(params: string) {
  return ZktlsReactnativeCoreSdk.callAlgorithm(params);
};

export async function init() {
  const params = `{"method":"init","version":"1.1.1","params":{}}`;
  const result = await callAlgorithm(params);
  return result;
}

export async function getAttestation(paramsObj: any) {
  const _paramsObj = { method: "getAttestation", version: "1.1.1", params: paramsObj };
  console.log(_paramsObj);
  const params = JSON.stringify(_paramsObj);
  const result = await callAlgorithm(params);
  return JSON.parse(result);
}

export async function getAttestationResult(timeout: number = 2 * 60 * 1000) {
  const params = `{"method":"getAttestationResult","version":"1.1.1","params":{"requestid":"1"}}`;

  return new Promise((resolve, reject) => {
    const start = performance.now();
    const tick = async () => {
      const timeGap = performance.now() - start;
      let resObj = null;
      try {
        const res = await callAlgorithm(params);
        resObj = JSON.parse(res);
      } catch (err) {
      }

      if (resObj && (resObj.retcode == "0" || resObj.retcode == "2")) {
        resolve(resObj);
      } else if (timeGap > timeout) {
        reject({
          code: 'timeout',
          data: resObj
        });
      } else {
        setTimeout(tick, 1000);
      }
    };
    tick();
  });
}
