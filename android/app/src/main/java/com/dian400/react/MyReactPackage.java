package com.dian400.react;

import com.dian400.react.easemob.RNEasemobModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.uimanager.ViewManager;
import com.dian400.react.geo.RNBaidulocModule;

import java.util.ArrayList;
import java.util.List;

public class MyReactPackage extends MainReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RNBaidulocModule(reactContext));
        modules.add(new RNEasemobModule(reactContext));
        return modules;
    }
}