package xyz.primuslabs.algorithm

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.bridge.Promise

// import xyz.primuslabs.algorithm.NativePrimus

@ReactModule(name = ZktlsReactnativeCoreSdkModule.NAME)
class ZktlsReactnativeCoreSdkModule(reactContext: ReactApplicationContext) :
  NativeZktlsReactnativeCoreSdkSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }
  
  override fun callAlgorithm(a: String, promise: Promise) {
    try {
        val result = NativePrimus.callAlgorithm(a)
        promise.resolve(result)
    } catch (e: Exception) {
        promise.reject("ERR_NATIVE", "Native call failed", e)
    }
  }

  companion object {
    const val NAME = "ZktlsReactnativeCoreSdk"
  }
}
