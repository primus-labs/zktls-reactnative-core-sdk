import ZktlsReactnativeCoreSdk from './NativeZktlsReactnativeCoreSdk';

export function multiply(a: number, b: number): number {
  return ZktlsReactnativeCoreSdk.multiply(a, b);
}
export function callAlgorithm(a: string): Promise<string> {
  return ZktlsReactnativeCoreSdk.callAlgorithm(a);
}
