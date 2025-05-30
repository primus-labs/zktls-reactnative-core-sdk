import { Text, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { PrimusCoreTLS } from 'zktls-reactnative-core-sdk';


export default function App() {
  const [initResult, setInitResult] = useState("");
  const [attResult, setAttResult] = useState("");
  const [verifyResult, setVerifyResult] = useState("");
  useEffect(() => {
    async function init() {
      // production
      const appId = "0xe319e567f70e2b2a153cb6ceaa73893648cde180";
      const appSecret = "0x4348563b2178adc171d851bcc27054d7879e07a41263ccfaa3b00d63d056559a";
      // test
      // const appId = "0x899dd126268e3010beaa1ac141a2a0aa98deba09";
      // const appSecret = "0x7da5d1cd2fdd494aa1176031151a6202734e30ddb14fd01dc3376616408ee0a7";
      try {

        // 1
        const zkTLS = new PrimusCoreTLS();
        const result = await zkTLS.init(appId, appSecret);
        console.error("-------------init result=", result);
        setInitResult(result.toString());

        // 2
        let request ={
          url: "https://www.okx.com/api/v5/public/instruments?instType=SPOT&instId=BTC-USD",
          method: "GET",
          header: {},
          body: ""
        };
        const responseResolves = [
          {
              keyName: 'instType',
              parsePath: '$.data[0].instType',
              parseType: 'string'
          }
        ];
        const generateRequestParamsRes = zkTLS.generateRequestParams(request, responseResolves)
        console.error("-------------generateRequestParams result=", generateRequestParamsRes);

        // 3.
        // Transfer request object to string.
        const generateRequestStr = generateRequestParamsRes.toJsonString();
        const signedRequestStr = await zkTLS.sign(generateRequestStr);
        const attestation = await zkTLS.startAttestation(signedRequestStr);
        setAttResult(JSON.stringify(attestation));
        console.error("attestation=", attestation);
        console.error("attestation.data=", attestation.data);
        const verifyAttestationRes = zkTLS.verifyAttestation(attestation)
        setVerifyResult(JSON.stringify(verifyAttestationRes));
        console.error("verifyAttestationRes=", verifyAttestationRes);
      } catch (e) {
        console.error(e);
      }
    }
    init();
  }, []);

  return (
    <View style={styles.container}>
      <ResultLabel label="Init Result" value={initResult} />
      <ResultLabel label="Attestation Result" value={attResult} />
      <ResultLabel label="Verify Result" value={verifyResult} />
    </View>
  );
}

const ResultLabel = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.resultItem}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  resultItem: {
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 15,
    color: '#666',
  },
});

