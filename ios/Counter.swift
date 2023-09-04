//
//  Counter.swift
//  AppNativeModuleProject
//
//  Created by Samba Diallo on 01/09/2023.
//

import Foundation

@objc(Counter)
//class Counter : NSObject {
  class Counter : RCTEventEmitter {
  private var count = 0;
  
  @objc
  func increment(_ callback:RCTResponseSenderBlock ) {
    count += 1;
    callback([count])
    sendEvent(withName: "onIncrement", body: ["count increase", count])
    
  }
  
  @objc
  func decrement(_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock  ) {
    if(count == 0) {
      let error = NSError(domain: "", code: 200, userInfo: nil);
      reject("ERROR_COUNT", "count cannot be negative", error)
    } else {
      count -= 1 ;
      resolve("count is \(count)")
      sendEvent(withName: "onDecrement", body: ["count decrease", count])
    }
    
  }
    
  override func supportedEvents() -> [String]! {
    ["onIncrement", "onDecrement"]
  }
  
  @objc
   override static func requiresMainQueueSetup() -> Bool {
     return true
   }
  
  @objc
    override func constantsToExport () ->[AnyHashable: Any]! {
    return ["initialCount": 0]
  }
  
}
