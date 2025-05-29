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
  const params1 = JSON.stringify(_paramsObj);
  console.log("ppppp:", params1);
  // const params = `{"PADOSERVERURL":"https://api-dev.padolabs.org","authUseridHash":"","padoUrl":"wss://api-dev.padolabs.org/algorithm-proxy","proxyUrl":"wss://api-dev.padolabs.org/algoproxy","source":"bilibili","modelType":"proxytls","isUserClick":"true","setHostName":"true","platformDescription":"TestFlight-FullApp-Simulator: iPhone17,1; iOS 18.4","padoExtensionVersion":"IOS-0.1.2.1","user":{"userid":"1","token":"","address":"0x7ab44DE0156925fe0c24482a2cDe48C465e47573"},"requestid":"98bb99f4-e3d3-4e98-bea3-3c34824fe251","reqType":"web","cipher":"ECDHE-RSA-AES128-GCM-SHA256","getdatatime":"1748490212432","credVersion":"1.0.5","errLogUrl":"","templateId":"1912023104163418112","appParameters":{"additionParams":"","appSignParameters":"{\"appId\":\"0x899dd126268e3010beaa1ac141a2a0aa98deba09\",\"attTemplateID\":\"c56918f0-fa78-49b0-b3cb-5244c408ef4c\",\"userAddress\":\"0x7ab44DE0156925fe0c24482a2cDe48C465e47573\",\"timestamp\":1746696281372,\"attMode\":{\"algorithmType\":\"proxytls\",\"resultType\":\"plain\"},\"requestid\":\"98bb99f4-e3d3-4e98-bea3-3c34824fe251\",\"backUrl\":\"http://api-dev.padolabs.org:38087/\"}","appId":"0x899dd126268e3010beaa1ac141a2a0aa98deba09","appSignature":"0x6a1f0a7bdf234e083aaef77c1f3952d0a519d74a32903af3710a012d7b5c7dd643bc44a519c064089779de6919f453d6dde3578ab6ef6b9dee2d3b9f9d4c20b61b"},"version":"1.1.1","padoVersion":"1.2.4","baseName":"api.bilibili.com","baseValue":"0","ext":{"extRequests":{"1748490212118-0.31173865797814027":{"name":"1748490212118-0.31173865797814027","url":"https://api.bilibili.com/x/web-interface/nav?web_location=333.400","headers":{"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 18_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148","Cookie":"buvid3=E8CBEF5D-09B7-2D75-5522-73C886D0FA0933598infoc; b_lsid=C9E92494_1971A23537D; _uuid=B2CCDC510-2FD8-BE17-9B4A-D9C52641925B12231infoc; buvid4=EB997326-6372-F3F8-4B8F-AFFA40735DA012358-125052911-McREVga72VUg4cbhgd2xIA%3D%3D; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDg3NDk0MTIsImlhdCI6MTc0ODQ5MDE1MiwicGx0IjotMX0._gS7vfpIzJAeiftwk1GUyUiTGUzFQX_KiveFD19H_E4; bili_ticket_expires=1748749352","Accept-Encoding":"identity"},"urlType":"REGX","method":"GET","calculationType":"MULTI_CONDITION","parseSchema":"{\"conditions\":{\"type\":\"CONDITION_EXPANSION\",\"subconditions\":[{\"reveal_id\":\"isLogin\",\"field\":\"$.data.isLogin\",\"op\":\"REVEAL_STRING\",\"type\":\"FIELD_REVEAL\"}],\"op\":\"BOOLEAN_AND\"}}"},"orders":["1748490212118-0.31173865797814027"]}}}`;
  // console.log("params:", params);
  const result = await callAlgorithm(params1);
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
