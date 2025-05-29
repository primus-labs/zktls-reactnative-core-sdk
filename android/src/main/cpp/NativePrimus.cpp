#include <jni.h>
#include <string>
#include <android/log.h>

#define LOG_TAG "PrimusNative"

#ifdef __x86_64__
// todo: can not support x86_64 simulator at present
// here defined only for test
std::string try_callAlgorithm(std::string json_params) {
  return R"({"arch":"x86_64, test"})";
}
#endif
// Default implementation for other architectures
std::string try_callAlgorithm(std::string json_params);

extern "C" JNIEXPORT jstring JNICALL
Java_xyz_primuslabs_algorithm_NativePrimus_callAlgorithm(JNIEnv *env, jobject obj, jstring jparams) {
    // Check if the input jparams is null to avoid crashes
    if (jparams == nullptr) {
        return env->NewStringUTF(R"({"error":"null input"})");
    }

    jboolean isCopy = true;
    const char *_jparams = env->GetStringUTFChars(jparams, &isCopy);

    // Check if GetStringUTFChars failed and returned nullptr
    if (_jparams == nullptr) {
        return env->NewStringUTF(R"({"error":"GetStringUTFChars failed"})");
    }

    // Convert the C string to a std::string
    std::string json_params(_jparams);

    // Release the memory allocated by GetStringUTFChars
    env->ReleaseStringUTFChars(jparams, _jparams);
    __android_log_print(ANDROID_LOG_INFO, LOG_TAG, "res：%s", _jparams);

    // Call the algorithm function and get the result
    std::string res = try_callAlgorithm(json_params);
    __android_log_print(ANDROID_LOG_INFO, LOG_TAG, "res：%s", res.c_str());

    // Create a new JNI string to return the result
    jstring jres = env->NewStringUTF(res.c_str());

    // Check if NewStringUTF failed and returned nullptr
    if (jres == nullptr) {
        return env->NewStringUTF(R"({"error":"JNI NewStringUTF failed"})");
    }

    // Return the result as a jstring
    return jres;
}
