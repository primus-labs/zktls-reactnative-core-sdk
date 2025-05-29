import { Text, View, StyleSheet } from 'react-native';
import { multiply, callAlgorithm } from 'zktls-reactnative-core-sdk';
import { useEffect, useState } from 'react';


const result0 = multiply(3, 7);


export default function App() {
  const [initResult, setInitResult] = useState("");
  useEffect(() => {
    async function init() {
      const res = await callAlgorithm('{"method":"init","version":"1.1.1","params":{"errLogUrl":""}}');
      setInitResult(res);
    }
    init();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result0: {result0}</Text>
      <Text>initResult: {initResult}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
