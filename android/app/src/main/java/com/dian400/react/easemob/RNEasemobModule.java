package com.dian400.react.easemob;

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
public class RNEasemobModule extends ReactContextBaseJavaModule {

    private Commonim commonim;
    private ReactContext mReactContext;

    public RNEasemobModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        Log.i("RNEasemobModule","getName");
        return "RNEasemob";
    }

    //发送参数到js端
    private void sendEvent(String eventName, WritableMap params) {
        Log.i("RNEasemobModule","sendEvent");
        Log.i("RNEasemobModule",params.toString());
        mReactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
    //js调用的方法
    @ReactMethod
    public void Initloc() {
//        commonloc = new Commonloc(mReactContext);
//        commonloc.Initloc(this.getReactApplicationContext());
    }

    @ReactMethod
    public void Create(String username,String pwd){
        commonim = new Commonim(mReactContext);
        commonim.Create(this.getReactApplicationContext(),username,pwd);
        //commonim.Initloc(this.getReactApplicationContext());
    }
    @ReactMethod
    public void Call(String username){
        commonim = new Commonim(mReactContext);
        commonim.Call(this.mReactContext,username);
    }
    @ReactMethod
    public void Answer(){
        commonim = new Commonim(mReactContext);
        commonim.Answer();
    }

    @ReactMethod
    public void endCall(){
        commonim = new Commonim(mReactContext);
        commonim.endCall();
    }

    @ReactMethod
     public void Initim(){
        commonim = new Commonim(mReactContext);
        commonim.Initim(this.getReactApplicationContext());
    }

    @ReactMethod
    public void Login(String username,String pwd){
        commonim = new Commonim(mReactContext);
        commonim.Login(this.getReactApplicationContext(), username, pwd);
    }

    @ReactMethod
    public void Reject(){
        commonim = new Commonim(mReactContext);
        commonim.Reject();
    }

    @ReactMethod
    public void StateChangeListener(){
        commonim = new Commonim(mReactContext);
        commonim.StateChangeListener(this.getReactApplicationContext());
    }

}


