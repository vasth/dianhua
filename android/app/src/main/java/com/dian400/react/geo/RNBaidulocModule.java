package com.dian400.react.geo;

import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;


import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;
import com.baidu.location.LocationClientOption.LocationMode;


/**
 * Created by Administrator on 15-11-4.
 */
public class RNBaidulocModule extends ReactContextBaseJavaModule {

    private Commonloc commonloc;
    private ReactContext mReactContext;

    public RNBaidulocModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        Log.i("BaiduLocationApiDem","getName");
        return "RNBaiduloc";
    }

    //发送参数到js端
    private void sendEvent(String eventName, WritableMap params) {
        Log.i("BaiduLocationApiDem","sendEvent");
        Log.i("BaiduLocationApiDem",params.toString());
        mReactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
    //js调用的方法
    @ReactMethod
    public void Initloc() {
        commonloc = new Commonloc(mReactContext);
        commonloc.Initloc(this.getReactApplicationContext());
    }

}


