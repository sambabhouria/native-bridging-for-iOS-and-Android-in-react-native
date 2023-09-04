package com.appnativemoduleproject;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.util.Map;
import java.util.HashMap;

public class CalendarModule extends ReactContextBaseJavaModule {
    private int eventCount = 0;
    CalendarModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "CalendarModule";
    }

    @ReactMethod // here this decorator because we want to pass our module
    public void createCalendarEvent(Callback callback) {
        Log.d("Calendar Module", "Log: create event for calendar is called");
        callback.invoke("Data return from Native Calendar Module ==>");
    }


    @ReactMethod // here this decorator because we want to pass our module
    public void createCalendarPromise(Promise promise) {
        try {

            promise.resolve("Data returned from promise");
            eventCount += 1;
            sendEvent( getReactApplicationContext(),
                    "EventCount",
                    eventCount);
        } catch (Exception exception) {
            promise.reject("Error return from Promise", exception);
        }
    }

    private void sendEvent(ReactContext reactContext, String eventName, int params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

}
