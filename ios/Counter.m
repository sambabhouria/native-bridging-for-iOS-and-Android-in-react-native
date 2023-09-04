//
//  Counter.m
//  AppNativeModuleProject
//
//  Created by Samba Diallo on 01/09/2023.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface
// RCT_EXTERN_MODULE(Counter, NSObject)
RCT_EXTERN_MODULE(Counter, RCTEventEmitter)

RCT_EXTERN_METHOD(increment:
                  (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(decrement:
                  (RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

@end
