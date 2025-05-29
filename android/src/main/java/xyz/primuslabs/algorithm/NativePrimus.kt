package xyz.primuslabs.algorithm;

import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlin.coroutines.suspendCoroutine

object NativePrimus {

    init {
        System.loadLibrary("native-primus")
        println("Load library success")
    }

    @JvmStatic
    external fun callAlgorithm(params: String): String

    suspend fun callAlgorithmSuspend(params: String): String = suspendCoroutine { continuation ->
        try {
            val result = callAlgorithm(params)
            continuation.resume(result)
        } catch (e: Exception) {
            continuation.resumeWithException(e)
        }
    }
}
