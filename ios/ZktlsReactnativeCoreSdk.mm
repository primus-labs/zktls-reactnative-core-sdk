#import "ZktlsReactnativeCoreSdk.h"
#include <string>

extern std::string try_callAlgorithm(std::string json_params);

@implementation ZktlsReactnativeCoreSdk
RCT_EXPORT_MODULE()

- (NSNumber *)multiply:(double)a b:(double)b {
  NSNumber *result = @(a * b);

  return result;
}

- (void)callAlgorithm:(NSString *)a
              resolve:(RCTPromiseResolveBlock)resolve
               reject:(RCTPromiseRejectBlock)reject {
  try { // useing C++  try/catch
    std::string inputStr = [a UTF8String];
    std::string result = try_callAlgorithm(inputStr);
    resolve([NSString stringWithUTF8String:result.c_str()]);
  } catch (const std::exception &e) { // cache C++ error
    NSString *errorDesc = [NSString stringWithUTF8String:e.what()];
    NSError *error =
        [NSError errorWithDomain:@"PrimusError"
                            code:-1
                        userInfo:@{NSLocalizedDescriptionKey : errorDesc}];
    reject(@"ERR_INVALID_INPUT", @"Call C++ Algorithm", error);
  } catch (...) { // Capture Other Unknown C++ err
    NSError *error = [NSError
        errorWithDomain:@"PrimusError"
                   code:-1
               userInfo:@{
                 NSLocalizedDescriptionKey : @"Unknown C++ exception occurred"
               }];
    reject(@"ERR_INVALID_INPUT", @"Call C++ Algorithm Other", error);
  }
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<
      facebook::react::NativeZktlsReactnativeCoreSdkSpecJSI>(params);
}

@end
